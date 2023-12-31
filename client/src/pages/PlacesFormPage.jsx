import React, { useEffect } from 'react'
import { useState } from 'react'
import PhotosUploader from '../PhotosUploader'
import Perks from '../Perks'
import axios from 'axios'
import AccountNav from '../AccountNav'
import { Navigate ,useParams } from 'react-router-dom'

const PlacesFormPage = () => {

    const {id} = useParams()
    console.log({id});
    const [title, setTitle] = useState('')
    const [address, setAddress] = useState('')
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [description, setDescription] = useState('')
    const [perks, setPerks] = useState([])
    const [extraInfo, setExtraInfo] = useState('')
    const [checkIn, setCheckIn] = useState('')
    const [checkOut, setCheckOut] = useState('')
    const [maxGuests, setMaxGuests] = useState(1)
    const [price, setPrice] = useState(100)
    const [redirect,setRedirect] = useState(false);
  
    useEffect(() => {
        if(!id) {
            return;
        }

        axios.get('/places/'+id)
            .then(response => {
                const {data} = response;
                setTitle(data.title)
                setAddress(data.address)
                setAddedPhotos(data.photos) 
                setDescription(data.description)
                setPerks(data.perks)
                setExtraInfo(data.extraInfo)
                setCheckIn(data.checkIn)
                setCheckOut(data.checkOut)
                setMaxGuests(data.maxGuests)
                setPrice(data.price)
            })
    }, [id])


    function inputHeader(text) {
        return (
            <h2 className='text-2xl mt-4'>{text}</h2>
            )
    }
    function inputDescription(text) {
        return (
            <p className='text-gray-500 text-sm'>{text}</p>
        )
    }
    function preInput(header, description) {
        return (
            <>
                {inputHeader(header)}
                {inputDescription(description)}
    
            </>
        )
    }


    async function savePlace(ev) {
        ev.preventDefault();

        const placeData = {
            title, address, addedPhotos, 
            description, perks, extraInfo,
            checkIn, checkOut, maxGuests, price}

        if (id) {
            await axios.put('/places', 
            {id, ...placeData});
            setRedirect(true)        
    
        } else {
            await axios.post('/places', placeData)
            setRedirect(true)        

        }
    }

    if (redirect) {
        return <Navigate to={'/account/places'} />
      }

    

  return (
    <div>
    <AccountNav/>
    <form onSubmit={savePlace}>
        {preInput('Title', 'Title, for example: Stunning 4-bed apartment in the heart of St. Tropez')}
        <input type='text' value={title} onChange={ev => setTitle(ev.target.value)} placeholder='Title'></input>
        {preInput('Address', 'Address for this property')}
        <input type='text' value={address} onChange={ev => setAddress(ev.target.value)} placeholder='Address'></input>
        {preInput('Photos', 'more = better')}
        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
        {preInput('Description', 'Create a description of your property')}
        <textarea value={description} onChange={ev => setDescription(ev.target.value)} placeholder='Describe your property...'/>
        {preInput('Perks', 'Select all perks that apply')}
        <div className='grid gap-2 mt-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-6'>
            <Perks selected={perks} onChange={setPerks}/>
        </div>

            <label>
            <div className='mt-10'>
                {preInput('Extra info', 'house rules, etc.')}
                <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)} />
            </div>
            </label>
            {preInput('Check-in & Check-out times', 'Add check-in and check-out times, remember to have some time window for cleaning the property between guests')}
            <div className='grid gap-2 grid-cols-2 md:grid-cols-4'>
                <div>
                    <h3 className='mt-2 -mb-2'>Check-in time</h3>
                    <input type='text' value={checkIn} onChange={ev => setCheckIn(ev.target.value)} placeholder='14:00'></input>
                </div>
                <div>
                    <h3 className='mt-2 -mb-2 gap-2'>Check-out time</h3>
                    <input type='text' value={checkOut} onChange={ev => setCheckOut(ev.target.value)} placeholder='10:00'></input>
                </div>
                <div>
                    <h3 className='mt-2 -mb-2 gap-2'>Max. guests</h3>
                    <input type='number' value={maxGuests} onChange={ev => setMaxGuests(ev.target.value)}></input>
                </div>
                <div>
                    <h3 className='mt-2 -mb-2 gap-2'>Price (€)</h3>
                    <input type='number' value={price} onChange={ev => setPrice(ev.target.value)}></input>
                </div>
                <div><button className='primary mt-4 mb-4'>Save</button></div>
            </div>
    </form>
</div>
  )
}

export default PlacesFormPage