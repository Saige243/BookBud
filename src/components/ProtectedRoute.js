import { useContext, useState, useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import AuthContext from '../auth/AuthContext'

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(false)
  }, [currentUser])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!currentUser) {
    return <Navigate to="/" replace />
  }
  return children ? children : <Outlet />
}

export default ProtectedRoute
