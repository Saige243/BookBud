import { createContext } from 'react'
import { AuthContextValue } from '../types'

const defaultAuthContextValue: AuthContextValue = {
  currentUser: null,
  setCurrentUser: () => {},
}

const AuthContext = createContext<AuthContextValue>(defaultAuthContextValue)
export default AuthContext
