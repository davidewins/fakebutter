import React, { useContext } from 'react'
import Register from './Register'
import { Link, Navigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { UserContext } from '../UserContext'


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [redirect, setRedirect] = useState(false);
  const {setUser} = useContext(UserContext)
  async function handleLoginSubmit(ev) {
    ev.preventDefault();
    try {
      const {data} = await axios.post('/login', {email, password})
      setUser(data)
      alert('Login succesful. You are now signed in')
      setRedirect(true);
    } catch (e) {
      alert('Login failed. Please double check password.')
    }
  }

  if (redirect) {
    return <Navigate to='/' />
  }

  return (
    <div className='mt-4 grow flex items-center justify-around'>
        <div className='mb-64'>
            <h1 className='text-4xl text-center mb-4'>Login</h1>
            <form className='max-w-md mx-auto' onSubmit={handleLoginSubmit}>
                <input 
                  className=''
                  type='email' 
                  placeholder='your@email.com' 
                  value={email} 
                  onChange={ev=>setEmail(ev.target.value)}
                >
                </input>
                <input 
                  type='password' 
                  placeholder='Password' 
                  value={password} 
                  onChange={ ev => setPassword(ev.target.value)}
                >
                </input>
                <button className='primary'>Login</button>
                <div className='py-2 text-center text-gray-500'>Don't have an account? <Link className='underline text-black' to={'/register'}>Register now</Link></div>
            </form>
        </div>
    </div>
    
  )
}

export default LoginPage