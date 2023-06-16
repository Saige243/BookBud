import { useNavigate } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import AuthContext from '../auth/AuthContext'

function Dashboard({ books }) {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  console.log('DASH USER:', user)

  // useEffect(() => {
  //   if (user === null) {
  //     alert('You must be logged in to view this page')
  //     navigate('/')
  //   }
  // }, [user])

  return (
    <div className="px-6">
      <h2>Hi, user</h2>
      <p>Email: </p>
      <div className="flex justify-center flex-row flex-wrap"></div>
    </div>
  )
}

export default Dashboard
