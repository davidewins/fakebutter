// import React, { useEffect, useState } from 'react';
// import {useParams} from 'react-router-dom';
// import axios from 'axios';
// import BookingWidget from '../BookingWidget';

// const PlacePage = () => {
//     const {id} = useParams()
//     const [place, setPlace] = useState(null)
//     const [showAllPhotos, setShowAllPhotos] = useState(false)
//     useEffect(() => {
//         if (!id) {
//             return;
//         } 
//         axios.get(`/places/${id}`).then(response => {
//             setPlace(response.data)
//         })
//     }, [id])

//     if (!place) {
//         return '';
//     }

//     if (showAllPhotos) {
//        return ( 
//         <div className='bg-black text-white inset-0 min-h-screen absolute'>
//         <div className='p-8 grid gap-4 bg-black'>
//         <div>
//             <h2 className='text-3xl mr-48'>Photos of {place.title}</h2>
//             <button onClick={() => setShowAllPhotos(false)} className='flex p-2 rounded-2xl fixed shadow-black bg-white text-black right-12 top-8'>
//             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//             </svg>
//                 Close photos
//             </button>
//         </div>
//           {place?.photos?.length > 0 && place.photos.map(photo => (
//             <div>
//               <img src={'http://localhost:3000/uploads/' +photo} alt=""/>
//             </div>
//           ))}
//           </div>
//         </div>
//        )
//     }


//   return (
//     <div className='mt-4 bg-gray-100 -mx-8 px-8 pt-8'>
//         <h1 className='text-3xl'>{place.title}</h1>
//         <a className={'flex gap-1 underline  font-semibold my-3'} target='_blank' href={"https://maps.google.com/?q=" +place.address}>
//         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
//             <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
//             <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
//         </svg>

//             {place.address}
//         </a>
//         <div className='relative'>
//             <div className='grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden'>
//                 <div>
//                     {place.photos?.[0] && (
//                         <div>
//                         <img onClick={() => setShowAllPhotos(true)} className='cursor-pointer aspect-square object-cover'  src={'http://localhost:3000/uploads/'+place.photos[0]} />
//                         </div>
//                     )}
//                 </div>

//                 <div className='grid'>
//                     {place.photos?.[1] && (
//                         <img onClick={() => setShowAllPhotos(true)} className='cursor-pointer aspect-square object-cover' src={'http://localhost:3000/uploads/'+place.photos[1]} />
//                     )}
//                     <div className='overflow-hidden'>
//                     {place.photos?.[2] && (
//                         <img onClick={() => setShowAllPhotos(true)} className='cursor-pointer aspect-square object-cove relative top-2' src={'http://localhost:3000/uploads/'+place.photos[2]} />
//                     )}
//                     </div>
//                     </div>
//                 </div>
//                 <button onClick={() => setShowAllPhotos(true)} className="flex gap-1 absolute bottom-2 right-2 py-2 px-4 bg-white rounded-2xl shadow-md shadow-gray-500">
//                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
//                     <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
//                     </svg>
//                     Show more photos
//                 </button>
//             </div>
//             <div className='grid grid-cols-1 md:grid-cols-[2fr_1fr] mt-8 mb-8 gap-8'>
//                 <div>
//                 <div className='mt-4'>
//             <h2 className='font-bold text-2xl mb-3'>Description</h2>
//                 {place.description}
//             </div>

//                     Check-in: {place.checkIn}<br />
//                     Check-out: {place.checkOut}<br />
//                     Max Guests: {place.maxGuests}
//                 </div>

//                 <div>
//                     {/* Booking widget goes here */}
//                     <BookingWidget place={place} />
//                 </div>
//             </div>
//             <div className='bg-white -mx-8 px-8 py-8 border-t'>
//                 <div>
//                     <h2 className='font-bold text-2xl'>Extra Info</h2>
//                 </div>
//                 <div className='text-gray-700 text-sm leading-4 mt-2 mb-4'>{place.extraInfo}</div>

//             </div>

//     </div>
//   )
// }

// export default PlacePage;


import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import BookingWidget from "../BookingWidget";
import PlaceGallery from "../PlaceGallery";
import AddressLink from "../AddressLink";

export default function PlacePage() {
  const {id} = useParams();
  const [place,setPlace] = useState(null);
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/places/${id}`).then(response => {
      setPlace(response.data);
    });
  }, [id]);

  if (!place) return '';



  return (
    <div className="mt-4 bg-gray-100 -mx-8 px-8 pt-8">
      <h1 className="text-3xl">{place.title}</h1>
      <AddressLink>{place.address}</AddressLink>
      <PlaceGallery place={place} />
      <div className="mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
        <div>
          <div className="my-4">
            <h2 className="font-semibold text-2xl">Description</h2>
            {place.description}
          </div>
          Check-in: {place.checkIn}<br />
          Check-out: {place.checkOut}<br />
          Max number of guests: {place.maxGuests}
        </div>
        <div>
          <BookingWidget place={place} />
        </div>
      </div>
      <div className="bg-white -mx-8 px-8 py-8 border-t">
        <div>
          <h2 className="font-semibold text-2xl">Extra info</h2>
        </div>
        <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">{place.extraInfo}</div>
      </div>
    </div>
  );
}
