import React from 'react';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <div className='flex flex-col items-center mx-56 gap-9'> 
        <h1 className='font-bold text-[40px] text-center leading-tight mt-16'>
          <span className='text-[#ad0731]'>Explore Smarter with AI:</span><br /> Personalized Travel Plans in the Palm of Your Hand.
        </h1>
        <p className='text-xl text-gray-500 text-center'>Step into the future of travel—where your preferences shape your path.</p>
        
        <Link to="/create-trip" className='no-underline'>
          <button className='bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out'>
              Get Started, It's Free
          </button>
        </Link>
    </div>
  );
}

export default Hero;
