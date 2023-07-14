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
import SavedBooks from './pages/SavedBooks'
import Landing from './pages/Landing'
import Layout from './components/Layout'

function App() {
  const { currentUser } = useContext(AuthContext)
  const [searchTerm, setSearchTerm] = useState('')
  const { books } = useGetBooks(searchTerm)

  const handleSearch = async (searchTerm) => {
    setSearchTerm(searchTerm)
  }

  return (
    <BrowserRouter>
      {currentUser && <Navbar onSubmitSearch={handleSearch} />}
      {currentUser && (
        <Layout>
          <div className="flex-grow">
            <Routes>
              <Route exact path="/" element={<Landing />} />
              <Route exact path="/login" element={<Login />} />
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
              <Route
                path="/savedBooks"
                element={currentUser ? <SavedBooks /> : <Login />}
              />
              <Route
                path="/profile"
                element={currentUser ? <Profile /> : <Login />}
              />
              <Route
                path="/books/:bookId"
                element={
                  currentUser ? <BookPage navigate={handleSearch} /> : <Login />
                }
              />
              <Route exact path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Layout>
      )}
    </BrowserRouter>
  )
}

export default App
