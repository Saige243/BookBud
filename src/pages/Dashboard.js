import { useContext } from 'react'
import AuthContext from '../auth/AuthContext'

function Dashboard({ books }) {
  const { currentUser } = useContext(AuthContext)

  return (
    <div className="px-6">
      <h2>Hi, {currentUser ? currentUser.email : ''}!</h2>
      <p>Email: </p>
      <div className="flex justify-center flex-row flex-wrap"></div>
    </div>
  )
}

export default Dashboard
