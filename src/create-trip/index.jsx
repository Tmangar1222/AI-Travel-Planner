import { Input } from '@/components/ui/input';
import { Toaster } from '@/components/ui/sonner';
import { AI_PROMPT, SelectBudgetOptions, SelectTravelersList } from '@/constants/options';
import { chatSession } from '@/service/AIModel';
import React, { useEffect, useState } from 'react';
import ReactGoogleAutocomplete from 'react-google-autocomplete';
import { toast } from "sonner"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/service/firebaseConfig';
import { AiOutlineLoading } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';



function CreateTrip() {
  // State to hold form dataSS
  const [formData, setFormData] = useState({});

  const [opendialog, setOpendialog] = useState(false);

  const [loading, setLoading] = useState(false);

  const navigate=useNavigate();

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onFailure: (error) => console.log(error)

  })

  const onGenerateTrip = async () => {

    const user = localStorage.getItem('user');
    if (!user) {
      setOpendialog(true);
      return;
    }


    if (formData.noOfDays > 5 && !formData?.location || !formData?.budget || !formData?.traveler) {
      toast('Please fill in all the fields to generate a trip.', 'error');
      return;
    }
    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT
      .replace('{location}', formData?.location?.formatted_address)
      .replace('{totalday}', formData?.noOfDays)
      .replace('{traveler}', formData?.traveler)
      .replace('{budget}', formData?.budget)
      .replace('{totalday}', formData?.noOfDays)

    const result = await chatSession.sendMessage(FINAL_PROMPT);

    console.log(result?.response?.text());
    setLoading(false);
    SaveAiTrip(result?.response?.text());

  };

  const SaveAiTrip = async (TripData) => {
  setLoading(true);
  const user = JSON.parse(localStorage.getItem('user'));
  const docId = Date.now().toString();

  // Extract latitude & longitude from Google Maps API object
  const locationData = formData?.location?.geometry?.location;
  const formattedLocation = {
    formatted_address: formData?.location?.formatted_address,
    lat: locationData?.lat(),  // Convert function to value
    lng: locationData?.lng()
  };

  await setDoc(doc(db, "AITrips", docId), {
    userSelection: { ...formData, location: formattedLocation }, // Store cleaned location
    tripData: JSON.parse(TripData),
    userEmail: user?.email,
    id: docId
  });

  setLoading(false);
  navigate('/view-trip/'+docId)
};


  const GetUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: "application/json",
      },
    })
      .then((response) => {
        console.log(response);
        localStorage.setItem('user', JSON.stringify(response.data));
        setOpendialog(false);
        onGenerateTrip();
      })
  }

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10 text-left">
      <h2 className="text-3xl font-bold">Plan your next trip!</h2>
      <p className="mt-3 text-gray-500 text-xl">
        Embark on a travel adventure that feels personally designed for you.
        A few quick details about your preferences are all it takes for our advanced planner
        to create your perfect escape.
      </p>

      {/* Destination Input */}
      <div className="mt-10 flex flex-col gap-6">
        <h2 className="text-xl my-1 font-medium">What is your destination of choice?</h2>
        <ReactGoogleAutocomplete
          apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
          id="destination"
          placeholder="Type to search for cities, landmarks, or countries"
          className="mt-1 block w-full px-4 py-3 border border-red-700 bg-red-900/20 rounded-lg 
                     text-black shadow-lg focus:outline-none focus:ring-red-500 focus:border-red-500 
                     transition-all duration-300 hover:bg-red-900/30 hover:border-red-600"
          onPlaceSelected={(place) => {
            handleInputChange('location', place);
          }}
          style={{ width: '100%' }}
        />
      </div>

      {/* Number of Days Input */}
      <div className="mt-6">
        <h2 className="text-xl my-3 font-medium">How many days are you traveling?</h2>
        <Input
          placeholder="Ex. 3"
          type="number"
          className="mt-1 block w-full px-4 py-3 border border-red-700 bg-red-900/20 rounded-lg 
                     text-black shadow-lg focus:outline-none focus:ring-red-500 focus:border-red-500 
                     transition-all duration-300 hover:bg-red-900/30 hover:border-red-600"
          onChange={(e) => handleInputChange('noOfDays', e.target.value)}
        />
      </div>

      {/* Budget Selection */}
      <div>
        <h2 className="text-xl my-3 font-medium">What is your budget?</h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectBudgetOptions.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange('budget', item.title)}
              className={`p-4 border border-red-700 bg-red-800/20 rounded-lg transition-all duration-300 
                          transform hover:bg-red-900 hover:scale-105 hover:shadow-lg hover:shadow-red-700/50 
                          text-white cursor-pointer ${formData?.budget === item.title ? 'bg-red-900' : ''
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

      {/* Travelers Selection */}
      <div>
        <h2 className="text-xl my-3 font-medium">Who do you plan to travel with on your next adventure?</h2>
        <div className="grid grid-cols-4 gap-5 mt-5">
          {SelectTravelersList.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange('traveler', item.people)}
              className={`p-4 border border-red-700 bg-red-800/20 rounded-lg transition-all duration-300 
                          transform hover:bg-red-900 hover:scale-105 hover:shadow-lg hover:shadow-red-700/50 
                          text-white cursor-pointer ${formData?.traveler === item.people ? 'bg-red-900' : ''
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

      {/* Submit Button */}
      <div className="my-10 flex justify-end">
        <button
          disabled={loading}
          onClick={onGenerateTrip}
          className="px-6 py-3 text-white text-lg font-semibold rounded-lg bg-red-800 
             hover:bg-red-900 active:scale-95 transition-all duration-300 
             shadow-lg shadow-red-900/60 border border-red-700 flex items-center justify-center gap-2"
        >
          {loading ? (
            <div className="h-10 w-10 border-4 border-white border-t-red-600 rounded-full animate-spin"></div>
          ) : (
            "✈️ Create Trip"
          )}
        </button>
      </div>

      <Dialog open={opendialog}>
        <DialogContent className="bg-gray-100 text-gray-800 rounded-lg shadow-md p-6">
          <DialogHeader>
            <DialogDescription className="flex flex-col items-center text-center">
              <img src="logo.svg" className="w-16 h-16" alt="Logo" /> {/* Adjust width and height */}
              <h2 className="font-bold text-lg mt-5">Sign in with Google</h2>
              <p className="text-gray-600 text-sm mt-2">Sign into the app with Google authentication securely</p>

              <button

                onClick={login}

                className="mt-5 w-full px-6 py-3 bg-gray-700 text-white rounded-md font-medium flex items-center 
          justify-center gap-2 hover:bg-gray-900 transition-all duration-300 shadow-md"
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