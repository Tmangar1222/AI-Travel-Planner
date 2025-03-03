import { Input } from '@/components/ui/input';
import { SelectBudgetOptions, SelectTravelersList } from '@/constants/options';
import React, { useEffect, useState } from 'react';
import ReactGoogleAutocomplete from 'react-google-autocomplete';

function CreateTrip() {
  // State to hold the selected place
  const [place, setPlace] = useState(null);

  const [formData, setFormData] = useState()

  const handleInputChange=(name, value)=>{
    setFormData({
      ...formData, 
      [name]: value
    })
  }

  useEffect(() => {
    console.log(formData)
  },[formData])


  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10 text-left">
      <h2 className="text-3xl font-bold">Plan your next trip!</h2>
      <p className="mt-3 text-gray-500 text-xl">
        Embark on a travel adventure that feels personally designed for you.
        A few quick details about your preferences are all it takes for our advanced planner
        to create your perfect escape.
      </p>

      <div className="mt-10 flex flex-col gap-6"> 
        <h2 className="text-xl my-1 font-medium">What is your destination of choice?</h2> {/* Reduced bottom margin */}
        <ReactGoogleAutocomplete
          apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
          id="destination"
          placeholder="Type to search for cities, landmarks, or countries"
          className="mt-1 block w-full px-4 py-3 border border-red-700 bg-red-900/20 rounded-lg text-black shadow-lg focus:outline-none focus:ring-red-500 focus:border-red-500 transition-all duration-300 hover:bg-red-900/30 hover:border-red-600"
          onPlaceSelected={(place) => {
            setPlace(place);
            handleInputChange('location', place);
          }}
          style={{ width: '100%' }} 
        />
      </div>

      <div className="mt-6"> 
        <h2 className="text-xl my-3 font-medium">How many days are you travelling?</h2>
        <Input placeholder="Ex. 3" type="number" className="mt-1 block w-full px-4 py-3 border border-red-700 bg-red-900/20 rounded-lg text-black shadow-lg focus:outline-none focus:ring-red-500 focus:border-red-500 transition-all duration-300 hover:bg-red-900/30 hover:border-red-600"
          onChange={(e) => handleInputChange('noOfdays', e.target.value)}
        />
      </div>

      <div>
        <h2 className="text-xl my-3 font-medium">What is your budget?</h2>
        <div className='grid grid-cols-3 gap-5 mt-5'>
          {SelectBudgetOptions.map((item, index) => (
            <div key={index} 
            onClick={() => handleInputChange('budget', item.title)}
            className='p-4 border border-red-700 bg-red-800/20 rounded-lg transition-all duration-300 transform hover:bg-red-900 hover:scale-105 hover:shadow-lg hover:shadow-red-700/50 text-white cursor-pointer'>
            <h2 className='text-4xl'>{item.icon}</h2>
            <h2 className='font-bold text-xl'>{item.title}</h2>
            <h2 className='text-sm text-gray-500'>{item.desc}</h2>
            <h2 className='text-sm text-gray-300'>{item.range}</h2>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-xl my-3 font-medium">Who do you plan to travel with on your next adventure?</h2>
        <div className='grid grid-cols-4 gap-5 mt-5'>
          {SelectTravelersList.map((item, index) => (
            <div key={index} 
            onClick={() => handleInputChange('traveler', item.people)}
            className='p-4 border border-red-700 bg-red-800/20 rounded-lg transition-all duration-300 transform hover:bg-red-900 hover:scale-105 hover:shadow-lg hover:shadow-red-700/50 text-white cursor-pointer'>
            <h2 className='text-4xl'>{item.icon}</h2>
            <h2 className='font-bold text-xl'>{item.title}</h2>
            <h2 className='text-sm text-gray-500'>{item.desc}</h2>
            <h2 className='text-sm text-gray-300'>{item.people}</h2>
            </div>
          ))}
        </div>
      </div>
      
      <div className="my-10 flex justify-end">
       <button className="px-6 py-3 text-white text-lg font-semibold rounded-lg bg-red-800 hover:bg-red-900 active:scale-95 transition-all duration-300 shadow-lg shadow-red-900/60 border border-red-700">
       ✈️ Create Trip
       </button>
      </div>

      
    </div>
  );
}

export default CreateTrip;
