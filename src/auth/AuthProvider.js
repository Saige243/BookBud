import useAuth from './useAuth'
import AuthContext from './AuthContext'

const AuthProvider = ({ children }) => {
  const { getUser } = useAuth()
  const user = getUser()

  console.log('PROVIDER CURRENT USER', user)
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  )
}

export default AuthProvider
