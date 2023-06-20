import { useState, useEffect, useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import AuthContext from '../auth/AuthContext'

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(false)
  }, [currentUser])

  console.log('PROTECTED ROUTE CURRENT USER', currentUser)
  if (isLoading) {
    return <div>Loading...</div>
  }

  if (currentUser === null) {
    console.log('NO USER:', currentUser)
    return <Navigate to="/" replace />
  }

  return children ? children : <Outlet />
}

export default ProtectedRoute
