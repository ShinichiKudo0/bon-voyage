import { db } from '@/service/firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import TripCard from './components/TripCard';

function MyTrip() {

  useEffect(() => {
    getUserTrips();
  }, [])

  const navigate = useNavigate();
  const [userTrips , setUserTrips] = useState([]);

  const getUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem('user'))
    if(!user){
      navigate('/')
      return;
  }
  
  const q = query(collection(db , "AITRIPS") , where('userEmail' , '==' , user?.email))

  const querySnapshot = await getDocs(q);
  setUserTrips([]);

  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
    setUserTrips(prev => [...prev , doc.data()])
  });
  }
  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10 w-full max-w-screen-lg mx-auto">
      <h2 className='font-bold text-4xl'>My Trips</h2>
      <div className='grid md:grid-cols-3 gap-5 mt-10'>
      {
                   
                   userTrips.length>0 ?
                   userTrips.map((trip,index) => (
                    
                       <TripCard trip={trip} key={index} />
                   ) )
                   :
                   [1,2,3,4,5,6].map((index) => (
                       <div key={index} className='h-[200px] w-full animate-pulse bg-slate-200 rounded-xl transition-all duration-100'>
                       </div>
                   ))
               }
      </div>
    </div>
  )

}
export default MyTrip