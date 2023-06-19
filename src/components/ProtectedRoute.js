import { useState, useEffect, useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import AuthContext from '../auth/AuthContext'

const ProtectedRoute = ({ children }) => {
  const { currentUser, setCurrentUser } = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(false)
  }, [currentUser])

  console.log('PROTECTED ROUTE CURRENT USER', currentUser)

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!currentUser || !currentUser.id) {
    return <Navigate to="/" replace />
  }

  return children ? children : <Outlet />
}

export default ProtectedRoute
