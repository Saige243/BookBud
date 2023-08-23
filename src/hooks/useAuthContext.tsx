import React from 'react'
import AuthContext from '../auth/AuthContext'
import { useContext } from 'react'

export const useAuthContext = () => {
  const user = useContext(AuthContext)
  console.log('USER', user)
  if (user === undefined) {
    throw new Error('useAuthContext can only be used inside AuthProvider')
  }
  return user
}
