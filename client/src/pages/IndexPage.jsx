import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../Header'
import { useEffect } from 'react'
import axios from 'axios'

const IndexPage = () => {
  const [places, setPlaces] = useState([])
  useEffect(() => {
    axios.get('/places').then(response => {
      setPlaces([...response.data, ...response.data,...response.data, ...response.data])
    })
  }, [])
  return (
    <>
    <div className='grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8'>
      {places.length > 0 && places.map(place => (
        <Link to={'/places/'+place._id} >
          <div className='bg-gray-500 rounded-2xl flex mb-2'>
            {place.photos?.[0] && (
                <img className='rounded-2xl object-cover aspect-square' src={'http://localhost:3000/uploads/'+ place.photos?.[0]} />
              )}
            </div>
            <h3 className='font-bold text-sm'>{place.address}</h3>
            <h2 className='text-sm truncate leading-2 text-gray-600'>
              {place.title}
            </h2>
            <div className='mt-1'>
              <span className='font-bold'>€{place.price}</span> /night
            </div>
        </Link>
      ))}
    </div>

    <div>
      <h2>Popular Cities</h2>
      <div className=''>
              
      </div>
    </div>
    </>
  )
}

export default IndexPage  