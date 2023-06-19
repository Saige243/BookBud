import AuthContext from './AuthContext'
import { useState } from 'react'

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)

  // console.log('PROVIDER CURRENT USER', currentUser)
  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
