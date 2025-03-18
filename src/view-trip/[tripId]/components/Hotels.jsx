import React from 'react';

function Hotels({ trip }) {
  return (
    <div className="mt-10">
      <h2 className="text-3xl font-bold text-red-900">🏨 Recommended Hotels</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-6 mt-6">
        {trip?.tripData?.travelPlan?.hotels?.map((hotel, index) => (
          <a
            key={index}
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel?.hotelName + ' ' + hotel?.hotelAddress)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-300 hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer flex flex-col h-[430px]">
              
              {/* Hotel Image (Fixed Height) */}
              <div className="relative w-full h-48">
                <img
                  // src={hotel?.hotelImageURL || "/vacation_image.jpg"} 
                  src={"/vacation_image.jpg"}
                  alt="Hotel"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20 rounded-t-xl"></div> {/* Light overlay for contrast */}
              </div>

              {/* Hotel Details */}
              <div className="p-5 flex flex-col flex-grow text-center">
                {/* Hotel Name (Ensures Consistent Height) */}
                <h2 className="text-lg font-semibold text-gray-900 line-clamp-2 h-[50px]">
                  {hotel?.hotelName || "Hotel Name"}
                </h2>

                {/* Address (Forces Two Lines) */}
                <h2 className="text-xs text-gray-600 flex items-center justify-center mt-2 h-[38px]">
                  📍 {hotel?.hotelAddress || "No Address Available"}
                </h2>

                {/* Rating */}
                <h2 className="text-sm flex items-center justify-center text-yellow-600 mt-2">
                  ⭐ <span className="ml-1">{hotel?.rating || "N/A"}/5</span>
                </h2>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default Hotels;
