import useAuth from './useAuth'
import { useState, useEffect } from 'react'
import AuthContext from './AuthContext'

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const { getUser } = useAuth()

  useEffect(() => {
    setUser(getUser())
  }, [])

  console.log('PROVIDER CURRENT USER', user)
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  )
}

export default AuthProvider
