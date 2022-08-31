import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'

//* Le composant Login affiche les inputs pour se connecter

const login = () => {
  const router = useRouter()
  const { user, login } = useAuth()
  const [data, setData] = useState({
    email: '',
    password: '',
  })

  const handleLogin = async (e) => {
    e.preventDefault()

    console.log(user)
    try {
      await login(data.email, data.password)
      router.push('/')
    } catch (err) {
      console.log(err)
    }
  }


  return (
    <div className='container mx-auto'>
      <form onSubmit={handleLogin}>
        <input type="email" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />
        <input type="password" value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default login