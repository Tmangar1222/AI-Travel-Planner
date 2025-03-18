import React, { useEffect, useState } from "react";
import { GetPlaceDetails } from "@/service/GlobalApi";

const GOOGLE_PLACES_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

function InfoSection({ trip }) {
  const [photoUrl, setPhotoUrl] = useState(null);

  useEffect(() => {
    if (trip) {
      GetPlacePhoto();
    }
  }, [trip]);

  const GetPlacePhoto = async () => {
    try {
      if (!trip?.tripData?.travelPlan?.location) return;

      const data = {
        textQuery: trip.tripData.travelPlan.location,
      };

      const result = await GetPlaceDetails(data);

      if (result?.data?.places?.length > 0 && result.data.places[0]?.photos?.length > 0) {
        const photoReference = result.data.places[0].photos[0].name;
        const newPhotoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=${photoReference}&key=${GOOGLE_PLACES_API_KEY}`;
        
        setPhotoUrl(newPhotoUrl);
      } else {
        console.warn("No place photos available.");
      }
    } catch (error) {
      console.error("Error fetching place photo:", error);
    }
  };

  return (
    <div className="relative w-full mt-[-200px] pt-0">
      <div className="relative bg-gradient-to-br from-red-900 to-red-800 rounded-2xl p-5 shadow-lg text-white">
        {/* Destination Image */}
        <div className="relative">
          <img
            src={photoUrl || "/vacation_image.jpg"} // Fallback image if no photo found
            alt="Destination"
            className="w-full h-[280px] md:h-[350px] object-cover rounded-lg shadow-md border border-red-700"
          />
          <div className="absolute inset-0 bg-black/30 rounded-lg"></div>
        </div>

        {/* Trip Details */}
        <div className="text-center mb-4 mt-3">
          <h2 className="text-2xl md:text-3xl font-bold tracking-wide uppercase">
            {trip?.tripData?.travelPlan?.location || "Unknown Destination"}
          </h2>

          {/* Trip Info Badges */}
          <div className="mt-3 flex flex-wrap justify-center gap-3">
            <div className="flex items-center gap-2 bg-red-700/80 px-4 py-1.5 rounded-lg shadow-md border border-red-600 text-sm md:text-base">
              ⏳ <span className="font-semibold">{trip?.tripData?.travelPlan?.duration || "N/A"} Days</span>
            </div>
            <div className="flex items-center gap-2 bg-red-700/80 px-4 py-1.5 rounded-lg shadow-md border border-red-600 text-sm md:text-base">
              💰 <span className="font-semibold">{trip?.tripData?.travelPlan?.budget?.replace(/\(.*\)/, '') || "N/A"}</span>
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
