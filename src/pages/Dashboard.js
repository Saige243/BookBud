import { useContext } from 'react'
import AuthContext from '../auth/AuthContext'

function Dashboard({ books }) {
  const { currentUser } = useContext(AuthContext)

  console.log('dash currentUser:', currentUser)

  return (
    <div className="px-6">
      <h2>Hi, {currentUser ? currentUser.firstName : ''}!</h2>
      <p>Email: {currentUser ? currentUser.email : ''}</p>
      <div className="flex justify-center flex-row flex-wrap"></div>
    </div>
  )
}

export default Dashboard
