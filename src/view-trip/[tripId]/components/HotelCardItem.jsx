import React, { useEffect, useState } from "react";
import { GetPlaceDetails } from "@/service/GlobalApi";

function HotelCardItem({ hotel }) {
  const [imageUrl, setImageUrl] = useState("/vacation_image.jpg");

  useEffect(() => {
    const fetchHotelPhoto = async () => {
      try {
        const query = `${hotel?.hotelName} ${hotel?.hotelAddress}`;
        const response = await GetPlaceDetails({ textQuery: query });
        const photos = response?.data?.places?.[0]?.photos;

        if (photos?.length > 0) {
          const photoName = photos[0].name;
          const mediaUrl = `https://places.googleapis.com/v1/${photoName}/media?maxHeightPx=400&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`;
          setImageUrl(mediaUrl);
        }
      } catch (error) {
        console.error("Failed to fetch hotel photo:", error);
      }
    };

    fetchHotelPhoto();
  }, [hotel]);

  return (
    <a
      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel?.hotelName + ' ' + hotel?.hotelAddress)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="block"
    >
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-300 hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer flex flex-col h-[430px]">
        {/* Hotel Image */}
        <div className="relative w-full h-48">
          <img
            src={imageUrl}
            alt="Hotel"
            className="w-full h-full object-cover rounded-t-xl"
          />
          <div className="absolute inset-0 bg-black/20 rounded-t-xl" />
        </div>

        {/* Hotel Details */}
        <div className="p-5 flex flex-col flex-grow text-center">
          <h2 className="text-lg font-semibold text-gray-900 line-clamp-2 h-[50px]">
            {hotel?.hotelName || "Hotel Name"}
          </h2>
          <h2 className="text-xs text-gray-600 mt-2 h-[38px]">
            📍 {hotel?.hotelAddress || "No Address Available"}
          </h2>
          <h2 className="text-sm text-yellow-600 mt-2">
            ⭐ {hotel?.rating || "N/A"}/5
          </h2>
        </div>
      </div>
    </a>
  );
}

export default HotelCardItem;
