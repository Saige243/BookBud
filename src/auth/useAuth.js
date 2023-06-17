import axios from 'axios'
import jwtDecode from 'jwt-decode'
import AuthContext from './AuthContext'
import { useContext } from 'react'

const useAuth = () => {
  const { setCurrentUser } = useContext(AuthContext)

  const getUser = () => {
    const jwtToken = localStorage.getItem('jwtToken')
    if (jwtToken) {
      const decodedJwtToken = jwtDecode(jwtToken)
      return decodedJwtToken
    } else {
      console.log('no token found')
      return null
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
      const decodedToken = jwtDecode(jwtToken)
      setCurrentUser(decodedToken)
      console.log(response.data)
    } catch (error) {
      console.error('Error on login:', error)
      throw new Error('Login failed')
    }
  }

  const signup = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:3001/signup', {
        email,
        password,
      })
      const jwtToken = response.data.token
      localStorage.setItem('jwtToken', jwtToken)
      console.log(response.data)
    } catch (error) {
      if (error.response.data.startsWith('E11000'))
        return onError('That email is taken.')
    }
  }

  const signout = () => {
    localStorage.removeItem('jwtToken')
  }

  return {
    getUser,
    signup,
    signout,
    login,
  }
}

export default useAuth
