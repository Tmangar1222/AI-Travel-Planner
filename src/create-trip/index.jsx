import { Input } from '@/components/ui/input';
import { Toaster } from '@/components/ui/sonner';
import { AI_PROMPT, SelectBudgetOptions, SelectTravelersList } from '@/constants/options';
import { chatSession } from '@/service/AIModel';
import React, { useEffect, useState } from 'react';
import ReactGoogleAutocomplete from 'react-google-autocomplete';
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/service/firebaseConfig';
import { useNavigate } from 'react-router-dom';

function CreateTrip() {
  const [formData, setFormData] = useState({});
  const [opendialog, setOpendialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    console.log("Form Data:", formData);
  }, [formData]);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onFailure: (error) => console.log(error),
  });

  const onGenerateTrip = async () => {
    const user = localStorage.getItem('user');
    if (!user) {
      setOpendialog(true);
      return;
    }

    // Strong validation
    if (
      !formData?.location?.formatted_address ||
      !formData?.location?.geometry ||
      !formData?.budget ||
      !formData?.traveler ||
      !formData?.noOfDays
    ) {
      toast.error("Please fill in all the fields to generate a trip.");
      return;
    }

    setLoading(true);

    const FINAL_PROMPT = AI_PROMPT
      .replace('{location}', formData?.location?.formatted_address)
      .replace(/{totalday}/g, formData?.noOfDays)
      .replace('{traveler}', formData?.traveler)
      .replace('{budget}', formData?.budget);

    try {
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      const responseText = await result?.response?.text();
      SaveAiTrip(responseText);
    } catch (error) {
      toast.error("Failed to generate trip.");
      console.error("AI Error:", error);
      setLoading(false);
    }
  };

  const SaveAiTrip = async (TripData) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const docId = Date.now().toString();

    const locationData = formData?.location?.geometry?.location;

    const formattedLocation = {
      formatted_address: formData.location.formatted_address,
      lat: locationData?.lat(),
      lng: locationData?.lng(),
    };

    try {
      await setDoc(doc(db, "AITrips", docId), {
        userSelection: { ...formData, location: formattedLocation },
        tripData: JSON.parse(TripData),
        userEmail: user?.email,
        id: docId
      });
      navigate(`/view-trip/${docId}`);
    } catch (error) {
      toast.error("Failed to save trip.");
      console.error("Firestore Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const GetUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: "application/json",
      },
    }).then((response) => {
      localStorage.setItem('user', JSON.stringify(response.data));
      setOpendialog(false);
      onGenerateTrip();
    });
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10 text-left">
      <h2 className="text-3xl font-bold">Plan your next trip!</h2>
      <p className="mt-3 text-gray-500 text-xl">
        Embark on a travel adventure that feels personally designed for you.
      </p>

      {/* Destination */}
      <div className="mt-10 flex flex-col gap-6">
        <h2 className="text-xl my-1 font-medium">What is your destination of choice?</h2>
        <ReactGoogleAutocomplete
          apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
          placeholder="Search cities or landmarks"
          className="mt-1 block w-full px-4 py-3 border border-red-700 bg-red-900/20 rounded-lg 
                     text-black shadow-lg focus:outline-none"
          onPlaceSelected={(place) => handleInputChange('location', place)}
        />
      </div>

      {/* Days */}
      <div className="mt-6">
        <h2 className="text-xl my-3 font-medium">How many days are you traveling?</h2>
        <Input
          placeholder="Ex. 3"
          type="number"
          value={formData.noOfDays || ''}
          onChange={(e) => handleInputChange('noOfDays', e.target.value)}
          className="mt-1 block w-full px-4 py-3 border border-red-700 bg-red-900/20 rounded-lg 
                     text-black shadow-lg focus:outline-none"
        />
      </div>

      {/* Budget */}
      <div>
        <h2 className="text-xl my-3 font-medium">What is your budget?</h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectBudgetOptions.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange('budget', item.title)}
              className={`p-4 border border-red-700 bg-red-800/20 rounded-lg cursor-pointer
                          hover:bg-red-900 transition-all duration-300 ${
                            formData.budget === item.title ? 'bg-red-900' : ''
                          }`}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-xl">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
              <h2 className="text-sm text-gray-300">{item.range}</h2>
            </div>
          ))}
        </div>
      </div>

      {/* Travelers */}
      <div>
        <h2 className="text-xl my-3 font-medium">Who are you traveling with?</h2>
        <div className="grid grid-cols-4 gap-5 mt-5">
          {SelectTravelersList.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange('traveler', item.people)}
              className={`p-4 border border-red-700 bg-red-800/20 rounded-lg cursor-pointer
                          hover:bg-red-900 transition-all duration-300 ${
                            formData.traveler === item.people ? 'bg-red-900' : ''
                          }`}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-xl">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
              <h2 className="text-sm text-gray-300">{item.people}</h2>
            </div>
          ))}
        </div>
      </div>

      {/* Submit */}
      <div className="my-10 flex justify-end">
        <button
          disabled={loading}
          onClick={onGenerateTrip}
          className="px-6 py-3 text-white text-lg font-semibold rounded-lg bg-red-800 
            hover:bg-red-900 transition-all duration-300 border border-red-700 flex items-center gap-2"
        >
          {loading ? (
            <div className="h-6 w-6 border-4 border-white border-t-red-600 rounded-full animate-spin"></div>
          ) : (
            "✈️ Create Trip"
          )}
        </button>
      </div>

      {/* Sign In Dialog */}
      <Dialog open={opendialog}>
        <DialogContent className="bg-white rounded-lg">
          <DialogHeader>
            <DialogDescription className="flex flex-col items-center">
              <img src="logo.svg" className="w-16 h-16" alt="Logo" />
              <h2 className="font-bold text-lg mt-4">Sign in with Google</h2>
              <p className="text-gray-500 text-sm mt-2">Required to save and view trips</p>
              <button
                onClick={login}
                className="mt-4 w-full px-6 py-3 bg-gray-700 text-white rounded-md flex items-center justify-center gap-2 hover:bg-gray-900"
              >
                <FcGoogle className="text-xl" /> Sign in with Google
              </button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateTrip;
