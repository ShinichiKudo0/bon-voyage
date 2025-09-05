import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import InfoSection from "./components/InfoSection"
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { toast } from "sonner";
import Hotels from "./components/Hotels";
import PlacesToVisit from "./components/PlacesToVisit";


function Viewtrip(){

    const{tripId}=useParams();
    const[trip,setTrip]=useState([]);
    useEffect(()=>{
        console.log("Trip ID:", tripId);
        tripId&&GetTripData();

    },[tripId])

    /**
     * Used to get Trip Information from Firebase
     */
    const GetTripData = async () => {
        try {
          const docRef = doc(db, "AITRIPS", tripId);
          const docSnap = await getDoc(docRef);
      
          if (docSnap.exists()) {
            console.log("Document found:", docSnap.data());
            setTrip(docSnap.data());
          } else {
            console.log("No Such Document");
            toast("No trip found!");
          }
        } catch (error) {
          console.error("Error fetching document:", error);
          toast("Error fetching trip data!");
        }
      };
      

    return(
        <div className="p-10 md:px-20 lg:px-44 xl:px-56">
            {/*Information Section */}
            <InfoSection trip={trip} />

            {/*Recommended Hotels*/}
            <Hotels trip={trip} />

            {/*Daily Plan*/}
            <PlacesToVisit trip={trip} />

            {/*Footer*/}
        </div>
    )
    
}
export default Viewtrip