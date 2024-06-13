import React from 'react'
import axios from 'axios'
import { useState } from 'react'

const Register = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    async function register(e) {
        e.preventDefault()
        await axios.post('/register', { username, password })
    }

  return (
    <div className='bg-blue-50 h-screen flex items-center'>
      <form className='w-64 mx-auto flex-row mb-12' onSubmit={register}>
        <input type="text"
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
        placeholder='username' className='block w-full rounded-sm p-2 mb-2 border'/>
        <input type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)} 
        placeholder='password' className='block w-full rounded-sm p-2 mb-2 border'/>
        <button className='bg-blue-500 text-white w-full block rounded-sm p-2'>Register</button>
      </form>
    </div>
  )
}

export default Register
