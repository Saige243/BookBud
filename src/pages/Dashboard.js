import { useContext } from 'react'
import AuthContext from '../auth/AuthContext'

function Dashboard({ books }) {
  const { currentUser } = useContext(AuthContext)

  return (
    <div className="bg-BBwhite px-6 h-screen">
      <h2>Hi, {currentUser ? currentUser.firstName : ''}!</h2>
      <p>Email: {currentUser ? currentUser.email : ''}</p>
      <div className="flex justify-center flex-row flex-wrap"></div>
    </div>
  )
}

export default Dashboard
