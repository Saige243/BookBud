import axios from 'axios'
import jwtDecode from 'jwt-decode'
import AuthContext from './AuthContext'
import { useContext } from 'react'

const useAuth = () => {
  const { updateCurrentUser } = useContext(AuthContext)

  const getUser = async () => {
    const jwtToken = localStorage.getItem('jwtToken')
    if (jwtToken) {
      const decodedToken = jwtDecode(jwtToken)
      const userId = decodedToken.userId
      try {
        const response = await axios.get(
          `http://localhost:3001/users/${userId}`
        )
        updateCurrentUser(response.data.user)
      } catch (error) {
        console.error('Error on getUser:', error)
      }
    } else {
      updateCurrentUser(null)
    }
  }

  const onError = (message) => {
    alert(message)
  }

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:3001/login', {
        email,
        password,
      })
      const jwtToken = response.data.token
      localStorage.setItem('jwtToken', jwtToken)
      // const decodedToken = jwtDecode(jwtToken)
      // setCurrentUser(decodedToken)
      await getUser()
    } catch (error) {
      console.error('Error on login:', error)
      throw new Error('Login failed')
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
      // const decodedToken = jwtDecode(jwtToken)
      // setCurrentUser(decodedToken)
      await getUser()
    } catch (error) {
      if (error.response.data.startsWith('E11000'))
        return onError('That email is taken.')
    }
  }

  const signout = () => {
    localStorage.removeItem('jwtToken')
    updateCurrentUser(null)
  }

  return {
    getUser,
    signup,
    signout,
    login,
  }
}

export default useAuth
