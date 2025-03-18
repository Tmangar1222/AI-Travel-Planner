import React from "react";
import { MapPin, ExternalLink } from "lucide-react"; // Import icons for Google Maps button

function Itinerary({ trip }) {
  // Check if itinerary data is available
  const itinerary = trip?.tripData?.travelPlan?.itinerary;

  if (!itinerary) {
    return <p className="text-center text-gray-500 mt-10">No itinerary available.</p>;
  }

  return (
    <div className="mt-10">
      <h2 className="text-3xl font-bold text-black text-center">📍 Itinerary</h2>

      <div className="mt-6 space-y-8">
        {Object.entries(itinerary)
          .sort(([dayA], [dayB]) => parseInt(dayA.replace("day", ""), 10) - parseInt(dayB.replace("day", ""), 10)) // Sort days in ascending order
          .map(([day, activities], dayIndex) => (
            <div key={dayIndex} className="bg-white p-6 rounded-xl shadow-md border border-gray-300">
              {/* Day Header */}
              <h2 className="text-xl font-bold bg-red-800 text-white px-5 py-1 rounded-lg inline-block">
                {day.replace("day", "Day ")}
              </h2>

              {/* Activity List - Single Column */}
              <div className="mt-4 space-y-6">
                {activities.map((activity, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-50 p-4 rounded-lg shadow-md border border-gray-200 flex items-center gap-5"
                  >
                    {/* Image on the Left */}
                    <div className="w-36 h-36 flex-shrink-0">
                      <img
                        src={activity?.placeImageURL || "/vacation_image.jpg"}
                        alt={activity?.placeName || "Image"}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>

                    {/* Activity Details - Centered Content */}
                    <div className="flex flex-col justify-center flex-1 text-center">
                      <h3 className="font-semibold text-lg">{activity?.placeName || "Unknown Place"}</h3>
                      <p className="text-sm text-gray-700 mt-1">📍 {activity?.placeAddress || "No Address Available"}</p>
                      <p className="text-sm text-gray-500 mt-1">🎟️ {activity?.ticketPricing || "Free"}</p>
                      <p className="text-sm text-gray-500">⭐ {activity?.rating || "N/A"} / 5</p>
                      <p className="text-sm text-gray-500">🕒 {activity?.time || "Anytime"}</p>
                      <p className="text-sm text-gray-500">⏳ {activity?.estimatedTravelTime || "Varies"}</p>

                      {/* Google Maps Link */}
                      {activity?.placeAddress && (
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                            activity?.placeName + " " + activity?.placeAddress
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className=" text-center mt-4 inline-flex items-center gap-2 px-4 py-2 bg-red-700 text-white font-semibold rounded-lg shadow-md transition-transform transform hover:scale-105 hover:bg-red-800"
                        >
                          <MapPin className="w-5 h-5" /> View on Google Maps <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Itinerary;
