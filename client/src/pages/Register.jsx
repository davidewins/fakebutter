import React from 'react'
import LoginPage from './LoginPage'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  async function registerUser(ev) {
    ev.preventDefault();
    try {
      await axios.post('/register', {
        name,
        email,
        password
      });
      alert('Registration successful. Now you can login')
    } catch(e) {
      alert('Registration failed. Please try again later')
    }

  }

  return (
    <div className='mt-4 grow flex items-center justify-around'>
        <div className='mb-64'>
            <h1 className='text-4xl text-center mb-4'>Sign up</h1>
            <form className='max-w-md mx-auto' onSubmit={registerUser}>
                <input className='' type='text' placeholder='Full Name' 
                  value={name} 
                  onChange={ ev => setName(ev.target.value)}
                  >
                </input>
                <input className='' type='email' placeholder='your@email.com' 
                  value={email} 
                  onChange={ ev => setEmail(ev.target.value)}
                  >
                  </input>
                <input type='password' placeholder='Password' 
                  value={password} 
                  onChange={ev => setPassword(ev.target.value)}
                  >
                  </input>
                <button className='primary'>Sign up</button>
                <div className='py-2 text-center text-gray-500'>Already have an account? <Link className='underline text-black' to={'/login'}>Login here</Link></div>
            </form>
        </div>
    </div>
  )
}

export default Register