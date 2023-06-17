import { useNavigate } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import AuthContext from '../auth/AuthContext'

function Dashboard({ books }) {
  const { currentUser } = useContext(AuthContext)
  const navigate = useNavigate()
  console.log('DASH USER:', currentUser)

  // useEffect(() => {
  //   if (user === null) {
  //     alert('You must be logged in to view this page')
  //     navigate('/')
  //   }
  // }, [user])

  return (
    <div className="px-6">
      <h2>Hi, {currentUser ? currentUser.email : ''}!</h2>
      <p>Email: </p>
      <div className="flex justify-center flex-row flex-wrap"></div>
    </div>
  )
}

export default Dashboard
