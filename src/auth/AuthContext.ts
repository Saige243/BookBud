import { createContext } from 'react'
import { AuthContextValue } from '../types'

const AuthContext = createContext<AuthContextValue>(null)
export default AuthContext
