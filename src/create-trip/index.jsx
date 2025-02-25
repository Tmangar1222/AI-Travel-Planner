import { Input } from '@/components/ui/input';
import { SelectBudgetOptions } from '@/constants/options';
import React, { useState } from 'react';
import ReactGoogleAutocomplete from 'react-google-autocomplete';

function CreateTrip() {
  // State to hold the selected place
  const [place, setPlace] = useState(null);

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10 text-left">
      <h2 className="text-3xl font-bold">Plan your next trip!</h2>
      <p className="mt-3 text-gray-500 text-xl">
        Embark on a travel adventure that feels personally designed for you.
        A few quick details about your preferences are all it takes for our advanced planner
        to create your perfect escape.
      </p>

      <div className="mt-10 flex flex-col gap-6"> {/* Adjusted gap for spacing between elements */}
        <h2 className="text-xl my-1 font-medium">What is your destination of choice?</h2> {/* Reduced bottom margin */}
        <ReactGoogleAutocomplete
          apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
          id="destination"
          placeholder="Type to search for cities, landmarks, or countries"
          className="form-input mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          onPlaceSelected={(place) => {
            setPlace(place);
            console.log(place);
          }}
          style={{ width: '100%' }} // This inline style ensures the input is as long as its container
        />
      </div>

      <div className="mt-6"> {/* Increased top margin to create more space */}
        <h2 className="text-xl my-3 font-medium">How many days are you travelling?</h2>
        <Input placeholder="Ex. 3" type="number" className="form-input mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
      </div>

      <div>
        <h2 className="text-xl my-3 font-medium">What is your budget?</h2>
        <div className='grid grid-cols-3 gap-5 mt-5'>
        {SelectBudgetOptions.map((item, index) => (
          <div key={index} className='p-4 border rounded-lg hover:shadow-lg'>
          <h2 className='text-4xl'>{item.icon}</h2>
          <h2 className='font-bold text-xl'>{item.title}</h2>
          <h2 className='text-sm text-gray-500'>{item.desc}</h2>
          <h2 className='text-sm text-gray-500'>{item.range}</h2>
          
          </div>
        ))}

        </div>
      </div>

    </div>
  );
}

export default CreateTrip;
