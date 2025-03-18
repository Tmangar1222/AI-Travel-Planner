import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import InfoSection from "./components/InfoSection";
import Hotels from "./components/Hotels";
import PlacesToVisit from "./components/PlacesToVisit";
import Footer from "./components/Footer";

function ViewTrip() {
    const { tripId } = useParams();
    const [trip, setTrip] = useState(null);
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        if (!tripId) return; // Prevent fetching if tripId is missing
        
        const fetchTripData = async () => {
            try {
                console.log("Fetching trip with ID:", tripId);
                const docRef = doc(db, "AITrips", tripId);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    console.log("Trip Data:", docSnap.data());
                    setTrip(docSnap.data());
                } else {
                    console.warn("No such document");
                    toast.error("No trip found with this ID");
                }
            } catch (error) {
                console.error("Error fetching trip:", error);
                toast.error("Error fetching trip data");
            } finally {
                setLoading(false); // Stop loading after fetch attempt
            }
        };

        fetchTripData();
    }, [tripId]);

    return (
        <div className="p-10 md:p-20 lg:p-40 xl:p-60">
            {/* Loading State */}
            {loading && <p className="text-center text-gray-600">Loading trip details...</p>}

            {/* Information Section */}
            {trip && <InfoSection trip={trip} />}

            {/* Recommended Hotels */}
            {trip && <Hotels trip={trip} />}   

            {/* Daily Plan */}
            {trip && <PlacesToVisit trip={trip} />} 

            {/* Footer */}
            {trip && <Footer trip={trip} />} 
        </div>
    );
}

export default ViewTrip;
