import AuthContext from './AuthContext'
import { useState } from 'react'

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)

  const updateCurrentUser = (user) => {
    setCurrentUser(user)
  }

  return (
    <AuthContext.Provider value={{ currentUser, updateCurrentUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
