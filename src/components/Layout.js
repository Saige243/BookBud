import { useState, useContext } from 'react'
import AuthContext from '../auth/AuthContext'
import { Link } from 'react-router-dom'
import LoginLogo from '../components/LoginLogo'
import SideNavCurrentlyReading from './SideNavCurrentlyReading'
import useBook from '../hooks/useBook'
import useAuth from '../auth/useAuth'

const Sidebar = () => {
  const { currentUser } = useContext(AuthContext)
  const { useGetCurrentlyReading } = useBook()
  // const { signout } = useAuth()

  const [currentlyReading, setCurrentlyReading] = useState(
    currentUser?.currentlyReading?.map((item) => item[0].bookId.bookId) || []
  )

  const { currentlyReading: currentlyReadingData } = useGetCurrentlyReading({
    ids: currentlyReading,
  })

  const displayedBooks = currentlyReadingData.slice(0, 2)

  // const links = ['Home', 'My Library', 'Search', 'Sign Out']
  // const pages = ['/dashboard', '/savedBook', '', '']

  return (
    <div className="flex flex-col bg-BBwhite text-white min-h-screen w-80 pt-8">
      <div>
        <Link to="/dashboard">
          <LoginLogo />
        </Link>
      </div>

      <div className="flex items-center justify-center p-4">
        <div className="">
          <p className="ml-3 font-unbounded text-md text-BBprimary1">
            {currentUser.firstName} {currentUser.lastName}
          </p>
          <p className="ml-3 font-montserrat text-xs text-BBprimary1">
            Books Read:
          </p>
        </div>
      </div>

      <div className="flex flex-col pt-8">
        {/* {links.map((link) => ( */}
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
        {/* ))} */}
        {/* <button onClick={() => signout()}></button> */}
      </div>

      <div className="flex flex-col flex-wrap p-4 pt-6">
        {displayedBooks.map((book) => (
          <SideNavCurrentlyReading key={book.id} props={book} />
        ))}
      </div>
    </div>
  )
}

const Layout = ({ children }) => {
  const { currentUser } = useContext(AuthContext)

  return (
    <div className="flex">
      {currentUser && <Sidebar />}
      <div className="flex-grow">{children}</div>
    </div>
  )
}

export default Layout
