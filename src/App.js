import { useContext, useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import SearchResults from './pages/SearchResults'
import Login from './pages/Login'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './pages/NotFound'
import Navbar from './components/Navbar'
import Profile from './pages/Profile'
import BookPage from './pages/BookPage'
import { useGetBooks } from './hooks/useGetBooks'
import Signup from './pages/Signup'
import AuthContext from './auth/AuthContext'
import useAuth from './auth/useAuth'

function App() {
  const { currentUser, setCurrentUser } = useContext(AuthContext)
  const { getUser } = useAuth()
  const [searchTerm, setSearchTerm] = useState('')
  const { books } = useGetBooks(searchTerm)
  // setCurrentUser(currentUser)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await getUser()
      } catch (error) {
        console.error('Error fetching user:', error)
      }
    }

    fetchUser()
  }, [])

  const handleSearch = async (searchTerm) => {
    setSearchTerm(searchTerm)
  }

  return (
    <BrowserRouter>
      {/* {currentUser && <Navbar onSubmitSearch={handleSearch} />} */}
      <Navbar onSubmitSearch={handleSearch} />
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        {/* <Route element={<ProtectedRoute />}> */}
        <Route path="/dashboard" element={<Dashboard books={books} />} />
        <Route
          path="/searchResults"
          element={<SearchResults books={books} searchTerm={searchTerm} />}
        />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/books/:bookId"
          element={<BookPage navigate={handleSearch} />}
        />
        {/* </Route> */}
        <Route exact path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
