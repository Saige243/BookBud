import React from 'react'
import { useState, useEffect, useContext } from 'react'
import AuthContext from '../auth/AuthContext'
import { Link, Outlet } from 'react-router-dom'
import LoginLogo from './LoginLogo'
import SideNavCurrentlyReading from './SideNavCurrentlyReading'
import useBook from '../hooks/useBook'
import AccountMenuDropdown from './AccountMenuDropdown'
import { useNavigate } from 'react-router-dom'

const Sidebar = () => {
  const { currentUser } = useContext(AuthContext)
  const { useGetCurrentlyReading, isLoading } = useBook()
  const booksRead = currentUser?.finishedBooks?.length

  const [currentlyReading, setCurrentlyReading] = useState(
    currentUser?.currentlyReading?.map((item) => item[0].bookId) || []
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

  const links = ['Home', 'My Books', 'Community']
  const pages = ['/dashboard', '/mybooks', '/community']

  return (
    <div className="hidden lg:flex flex-col bg-BBwhite text-white min-h-screen pt-8">
      <div className="hidden sm:flex items-center justify-center">
        <div className="flex items-center">
          <div>
            <AccountMenuDropdown />
          </div>
          <div>
            <p className="ml-1 font-unbounded text-md text-BBprimary1">
              {currentUser?.firstName} {currentUser?.lastName}
            </p>
            <p className="ml-1 font-montserrat text-xs text-BBprimary1">
              Books Read: {booksRead}
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

const Layout = () => {
  const { currentUser } = useContext(AuthContext)
  const navigate = useNavigate()

  if (!currentUser) {
    navigate('/login')
    return null
  }

  return (
    <div className="flex">
      {currentUser && <Sidebar />}
      <div className="flex-grow">
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
