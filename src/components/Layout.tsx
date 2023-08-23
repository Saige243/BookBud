import React from 'react'
import { useState, useEffect, useContext } from 'react'
import AuthContext from '../auth/AuthContext'
import { Link } from 'react-router-dom'
import LoginLogo from './LoginLogo'
import SideNavCurrentlyReading from './SideNavCurrentlyReading'
import useBook from '../hooks/useBook'
import AccountMenuDropdown from './AccountMenuDropdown'

const Sidebar = () => {
  const { currentUser } = useContext(AuthContext)
  const { useGetCurrentlyReading, isLoading } = useBook()

  const [currentlyReading, setCurrentlyReading] = useState(
    currentUser?.currentlyReading?.map((item) => item[0].bookId.bookId) || []
  )

  const { currentlyReading: currentlyReadingData } = useGetCurrentlyReading({
    ids: currentlyReading,
  })

  const displayedBooks = currentlyReadingData.slice(0, 2)

  useEffect(() => {
    setCurrentlyReading(
      currentUser?.currentlyReading?.map((item) => item[0].bookId.bookId) || []
    )
  }, [currentUser])

  const links = ['Home', 'My Library', 'Community']
  const pages = ['/dashboard', '/savedBooks']

  return (
    <div className="flex flex-col bg-BBwhite text-white min-h-screen pt-8">
      <div>
        <Link to="/dashboard">
          <LoginLogo />
        </Link>
      </div>

      <div className="flex items-center justify-center p-4">
        <div className="flex items-center">
          <div>
            <AccountMenuDropdown />
          </div>
          <div>
            <p className="ml-3 font-unbounded text-md text-BBprimary1">
              {currentUser?.firstName} {currentUser?.lastName}
            </p>
            <p className="ml-3 font-montserrat text-xs text-BBprimary1">
              Books Read:
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col pt-8">
        {links.map((link, index) => (
          <Link
            key={index}
            to={pages[index]}
            className="p-4 text-xl hover:bg-BBblue text-unbounded rounded-e-full"
          >
            <p className="font-unbounded text-BBprimary1 pl-8">{link}</p>
          </Link>
        ))}
      </div>

      <div className="flex flex-col flex-wrap p-4 pt-6">
        {!isLoading &&
          displayedBooks.map((book: any) => (
            <SideNavCurrentlyReading key={book.id} props={book} />
          ))}
      </div>
    </div>
  )
}

const Layout = ({ onSubmitSearch, children }) => {
  const { currentUser } = useContext(AuthContext)

  return (
    <div className="flex">
      {currentUser && <Sidebar />}
      <div className="flex-grow">{children}</div>
    </div>
  )
}

export default Layout
