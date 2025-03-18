import React from 'react';
import { FaInstagram, FaGithub, FaLinkedin } from 'react-icons/fa';

function Footer() {
  return (
    <div className="mt-10 bg-red-900 text-white py-6 px-4 text-center rounded-t-2xl shadow-lg">
      {/* Name & Branding */}
      <h2 className="text-lg font-semibold">Crafted with ✨ by Taruna Mangar </h2>
      <p className="text-sm text-gray-300 mt-1">Inspiring Travel, One Trip at a Time</p>

      Social Media Links
      <div className="flex justify-center gap-6 mt-3">
        <a 
          href="https://github.com/yourgithub" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="hover:text-gray-300 transition-all"
        >
          <FaGithub className="text-2xl" />
        </a>
        <a 
          href="https://linkedin.com/in/yourlinkedin" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="hover:text-gray-300 transition-all"
        >
          <FaLinkedin className="text-2xl" />
        </a>
      </div>

      {/* Copyright */}
      <p className="text-xs text-gray-400 mt-4">
        © {new Date().getFullYear()} AI Travel Planner | All Rights Reserved
      </p>
    </div>
  );
}

export default Footer;
