import { useState } from 'react'
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
import { useAuthContext } from './hooks/useAuthContext'

function App() {
  const { user } = useAuthContext()
  const [searchTerm, setSearchTerm] = useState('')
  const { books } = useGetBooks(searchTerm)

  const handleSearch = async (searchTerm) => {
    setSearchTerm(searchTerm)
  }

  console.log('Authenticated?:', user)

  return (
    <BrowserRouter>
      {user && <Navbar onSubmitSearch={handleSearch} />}
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        {/* <Route element={<ProtectedRoute isAuthenticated={user} />}> */}
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
