import axios from 'axios'
import jwtDecode, { JwtPayload } from 'jwt-decode'
import AuthContext from './AuthContext'
import { useContext } from 'react'

interface DecodedToken extends JwtPayload {
  userId: string
}

const useAuth = () => {
  const { setCurrentUser } = useContext(AuthContext)

  const onError = (message: string) => {
    alert(message)
  }

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
        console.error('Error on getUser:', error)
      }
    } else {
      setCurrentUser(null)
    }
  }

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:3001/login', {
        email,
        password,
      })
      const jwtToken = response.data.token
      localStorage.setItem('jwtToken', jwtToken)
      await getUser()
    } catch (error) {
      onError('Invalid email or password.')
    }
  }

  const signup = async (firstName, lastName, email, password) => {
    try {
      const response = await axios.post('http://localhost:3001/signup', {
        firstName,
        lastName,
        email,
        password,
      })
      const jwtToken = response.data.token
      localStorage.setItem('jwtToken', jwtToken)
      await getUser()
    } catch (error) {
      if (error.response.data.startsWith('E11000'))
        return onError('That email is taken.')
    }
  }

  const signout = () => {
    localStorage.removeItem('jwtToken')
    setCurrentUser(null)
  }

  const editUserName = async (firstName, lastName) => {
    const jwtToken = localStorage.getItem('jwtToken')
    if (jwtToken) {
      const decodedToken: DecodedToken = jwtDecode(jwtToken)
      const userId = decodedToken.userId
      try {
        const response = await axios.patch(
          `http://localhost:3001/users/${userId}`,
          {
            firstName,
            lastName,
          }
        )
        setCurrentUser(response.data.user)
      } catch (error) {
        console.error('Error on editUserName:', error)
      }
    } else {
      setCurrentUser(null)
    }
  }

  return {
    getUser,
    signup,
    signout,
    login,
    editUserName,
  }
}

export default useAuth
