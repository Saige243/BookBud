import AuthContext from './AuthContext'
import { useEffect, useState } from 'react'
import axios from 'axios'
import jwtDecode from 'jwt-decode'

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem('currentUser'))
  )

  useEffect(() => {
    const getUser = async () => {
      const jwtToken = localStorage.getItem('jwtToken')
      if (jwtToken) {
        const decodedToken = jwtDecode(jwtToken)
        const userId = decodedToken.userId
        try {
          const response = await axios.get(
            `http://localhost:3001/users/${userId}`
          )
          setCurrentUser(response.data.user)
        } catch (error) {
          console.error('Error on getUser:', error)
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
