import React from 'react'
import AuthContext from './AuthContext'
import { useEffect, useState } from 'react'
import axios from 'axios'
import jwtDecode, { JwtPayload } from 'jwt-decode' // Import JwtPayload
import { User } from '../types'

interface DecodedToken extends JwtPayload {
  userId: string
}

const AuthProvider = ({ children }) => {
  const storedCurrentUser = JSON.parse(localStorage.getItem('currentUser'))
  const [currentUser, setCurrentUser] = useState<User | null>(
    storedCurrentUser !== null ? storedCurrentUser : null
  )

  useEffect(() => {
    const getUser = async () => {
      const jwtToken = localStorage.getItem('jwtToken')
      if (jwtToken) {
        const decodedToken: DecodedToken = jwtDecode(jwtToken)
        const userId = decodedToken.userId
        try {
          const response = await axios.get(
            `http://localhost:3001/users/${userId}`
          )
          setCurrentUser(response.data.user)
        } catch (error) {
          console.log('Error on getUser:', error)
          console.log('currentUser:', currentUser)
        }
      } else {
        setCurrentUser(null)
      }
    }

    getUser()
  }, [])

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
