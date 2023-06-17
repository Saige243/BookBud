import useAuth from './useAuth'
import AuthContext from './AuthContext'
import { useEffect, useState } from 'react'

const AuthProvider = ({ children }) => {
  // const { getUser } = useAuth()
  // const user = getUser()
  const [currentUser, setCurrentUser] = useState(null)

  // useEffect(() => {
  //   setCurrentUser(currentUser)
  // }, [currentUser])

  console.log('PROVIDER CURRENT USER', currentUser)
  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
