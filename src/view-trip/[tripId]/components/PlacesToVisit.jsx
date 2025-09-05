import React from "react";
import { Button } from "@/components/ui/button";
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";

function PlacesToVisit({ trip }) {
  // Default values to avoid errors
  const itinerary = trip?.tripData?.itinerary || [];

  return (
    <div>
      <h2 className="font-bold text-lg">Places to Visit</h2>
      <div>
        {itinerary.length === 0 ? (
          <p>No itinerary data available.</p>
        ) : (
          itinerary.map((item, index) => (
            <div key={index}>
              <h2 className="font-medium text-lg">Day {item.day}</h2>
              <div className="grid md:grid-cols-2 gap-5">
                {item.plan?.map((place, index) => (
                  <div className="my-3" key={index}>
                    <h2 className="font-medium text-sm text-orange-600">
                      {place?.time}
                    </h2>
                    <div className="border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer">
                      <img
                        src={place?.PlaceImageUrl}
                        className="w-[130px] h-[130px] rounded-xl"
                        alt={place?.placeName}
                      />
                      <div>
                        <h2 className="font-bold text-lg">
                          {place?.placeName}
                        </h2>
                        <p className="text-sm text-gray-400">
                          {place?.PlaceDetails}
                        </p>
                        <p className="text-sm text-gray-400">
                          {place?.Timetravel}
                        </p>
                        <h2>🎟️ {place?.ticketPricing}</h2>
                        <Button size-sm>
                          <FaMapLocationDot />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default PlacesToVisit;
