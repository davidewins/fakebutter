import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Routes, Route} from 'react-router-dom'
import IndexPage from './pages/IndexPage'
import LoginPage from './pages/LoginPage'
import AccountPage from './pages/ProfilePage'
import Layout from './Layout'
import Register from './pages/Register'
import axios from 'axios'
import { UserContextProvider } from './UserContext'
import { useEffect } from 'react'
import ProfilePage from './pages/ProfilePage'
import PlacesPage from './pages/PlacesPage'
import PlacesFormPage from './pages/PlacesFormPage'
import PlacePage from './pages/PlacePage'
import BookingsPage from './pages/BookingsPage'
import BookingPage from './pages/BookingPage'

axios.defaults.baseURL = 'http://localhost:3000'
axios.defaults.withCredentials = true;

 function App() {

  return (
    <UserContextProvider>
    <Routes>
      <Route path='/' element={<Layout />}>
      <Route index element={<IndexPage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<Register />} />
      <Route path='/account' element={<ProfilePage/>} />
      <Route path='/account/:subpage?' element={<ProfilePage/>} />
      <Route path='/account/places' element={<PlacesPage/>} />
      <Route path='/account/places/new' element={<PlacesFormPage/>} />
      <Route path='/account/places/:id' element={<PlacesFormPage/>} />
      <Route path='/places/:id' element={<PlacePage/>} />
      <Route path='/account/bookings' element={<BookingsPage/>} />
      <Route path='/account/bookings/:id' element={<BookingPage/>} />
      </Route>
    </Routes>
    </UserContextProvider>

    
  )
}

export default App;


