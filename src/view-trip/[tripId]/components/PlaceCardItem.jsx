import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";
import React, { useEffect, useState } from "react"

function PlaceCardItem(place) {

    const [photoUrl,setPhotoUrl]=useState();
    useEffect(()=>{
        place&&GetPlacePhoto();
    },[place])
    const GetPlacePhoto=async()=>{
        const data={
            textQuery:place?.placeName
        }
        const result=await GetPlaceDetails(data).then(resp=>{
            const PhotoUrl=PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[3].name);
            setPhotoUrl(PhotoUrl);
        })
    }
    return(
        <div className="border rounded-xl p-3 mt-2" >
            <img src={photoUrl?photoUrl:'/placeholder.jpg'} className="w-[130px] h-[130px] rounded-xl object-cover"/>
            <div>
                <h2>{place?.placeName}</h2>
            </div>
        </div>

    )
}

export default PlaceCardItem