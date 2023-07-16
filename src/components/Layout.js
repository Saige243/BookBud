import { useContext } from 'react'
import AuthContext from '../auth/AuthContext'
import { Link } from 'react-router-dom'
import LoginLogo from '../components/LoginLogo'

const Sidebar = () => {
  const { currentUser } = useContext(AuthContext)

  return (
    <div className="flex flex-col bg-BBwhite text-white min-h-screen w-64 pt-8">
      <div>
        <Link to="/dashboard">
          <LoginLogo />
        </Link>
      </div>
      <div className="flex items-center justify-center p-4">
        <div className="flex-shrink-0 rounded-full h-16 w-16 bg-gray-500"></div>
        <div className="flex flex-col">
          <span className="ml-3 font-unbounded text-md text-BBprimary1">
            {currentUser.firstName} {currentUser.lastName}
          </span>
          <span className="ml-3 font-montserrat text-xs text-BBprimary1">
            Books Read:
          </span>
        </div>
      </div>

      <div className="flex flex-col flex-grow pt-8">
        <Link
          to="/dashboard"
          className="p-4 text-xl hover:bg-BBblue text-unbounded rounded-e-full"
        >
          <p className="font-unbounded text-BBprimary1 pl-8">Home</p>
        </Link>
        <Link
          to="/savedBooks"
          className="p-4 text-xl hover:bg-BBblue text-unbounded rounded-e-full"
        >
          <p className="font-unbounded text-BBprimary1 pl-8">My Library</p>
        </Link>
        <Link
          to="#"
          className="p-4 text-xl hover:bg-BBblue text-unbounded rounded-e-full"
        >
          <p className="font-unbounded text-BBprimary1 pl-8">Community</p>
        </Link>
      </div>
    </div>
  )
}

const Layout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow">{children}</div>
    </div>
  )
}

export default Layout
