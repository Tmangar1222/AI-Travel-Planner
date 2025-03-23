import { GetPlaceDetails } from "@/service/GlobalApi";
import React, { useEffect, useState } from "react";

function InfoSection({ trip }) {
  const [photoUrl, setPhotoUrl] = useState(null);

  useEffect(() => {
    if (trip?.userSelection?.location?.formatted_address) {
      fetchPlacePhoto();
    }
  }, [trip]);

  const fetchPlacePhoto = async () => {
    const data = { textQuery: trip.userSelection.location.formatted_address };

    try {
      const response = await GetPlaceDetails(data);
      const photos = response?.data?.places?.[0]?.photos;

      if (photos && photos.length > 0) {
        const photoName = photos[0].name; // e.g., places/xyz/photos/abc
        const mediaUrl = `https://places.googleapis.com/v1/${photoName}/media?maxHeightPx=600&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`;

        setPhotoUrl(mediaUrl);
        console.log("✅ PHOTO URL:", mediaUrl);
      } else {
        console.warn("⚠️ No photos returned for this location.");
      }
    } catch (error) {
      console.error("❌ Error fetching place photo:", error);
    }
  };

  return (
    <div className="relative w-full mt-[-200px] pt-0">
      <div className="relative bg-gradient-to-br from-red-900 to-red-800 rounded-2xl p-5 shadow-lg text-white">
        {/* Destination Image */}
        <div className="relative">
          <img
            src={photoUrl || "/vacation_image.jpg"}
            alt="Destination"
            className="w-full h-[280px] md:h-[350px] object-cover rounded-lg shadow-md border border-red-700"
          />
          <div className="absolute inset-0 bg-black/30 rounded-lg"></div>
        </div>

        {/* Trip Details */}
        <div className="text-center mb-4 mt-3">
          <h2 className="text-2xl md:text-3xl font-bold tracking-wide uppercase">
            {trip?.userSelection?.location?.formatted_address || "Unknown Destination"}
          </h2>

          <div className="mt-3 flex flex-wrap justify-center gap-3">
            <div className="flex items-center gap-2 bg-red-700/80 px-4 py-1.5 rounded-lg shadow-md border border-red-600 text-sm md:text-base">
              ⏳ <span className="font-semibold">
                {trip?.userSelection?.noOfDays ? `${trip.userSelection.noOfDays} Days` : "N/A"}
              </span>
            </div>
            <div className="flex items-center gap-2 bg-red-700/80 px-4 py-1.5 rounded-lg shadow-md border border-red-600 text-sm md:text-base">
              💰 <span className="font-semibold">{trip?.userSelection?.budget || "N/A"} Budget</span>
            </div>
            <div className="flex items-center gap-2 bg-red-700/80 px-4 py-1.5 rounded-lg shadow-md border border-red-600 text-sm md:text-base">
              👥 <span className="font-semibold">{trip?.userSelection?.traveler || "N/A"} Traveler(s)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoSection;
