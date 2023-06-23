import { useContext, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import SearchResults from './pages/SearchResults'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import Navbar from './components/Navbar'
import Profile from './pages/Profile'
import BookPage from './pages/BookPage'
import { useGetBooks } from './hooks/useGetBooks'
import Signup from './pages/Signup'
import AuthContext from './auth/AuthContext'

function App() {
  const { currentUser } = useContext(AuthContext)
  const [searchTerm, setSearchTerm] = useState('')
  const { books } = useGetBooks(searchTerm)

  const handleSearch = async (searchTerm) => {
    setSearchTerm(searchTerm)
  }

  // console.log(currentUser ? 'APP CURRENT USER', currentUser._id : 'NO USER')

  return (
    <BrowserRouter>
      {currentUser && <Navbar onSubmitSearch={handleSearch} />}
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={currentUser ? <Dashboard books={books} /> : <Login />}
        />
        <Route
          path="/searchResults"
          element={
            currentUser ? (
              <SearchResults books={books} searchTerm={searchTerm} />
            ) : (
              <Login />
            )
          }
        />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/books/:bookId"
          element={
            currentUser ? <BookPage navigate={handleSearch} /> : <Login />
          }
        />
        <Route exact path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
