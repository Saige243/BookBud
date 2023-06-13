import { useAuthContext } from '../hooks/useAuthContext'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

function Dashboard({ books }) {
  const { user } = useAuthContext()
  const navigate = useNavigate()
  console.log('user:', user)

  useEffect(() => {
    if (user === null) {
      alert('You must be logged in to view this page')
      navigate('/')
    }
  }, [user])

  return (
    <div className="px-6">
      <h2>Hi, user</h2>
      <p>Email: </p>
      <div className="flex justify-center flex-row flex-wrap"></div>
    </div>
  )
}

export default Dashboard
