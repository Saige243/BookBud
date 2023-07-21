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
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const { currentUser } = useContext(AuthContext)
  const [searchTerm, setSearchTerm] = useState('nyt best sellers')
  const { books, isLoading } = useGetBooks(searchTerm)

  const handleSearch = async (searchTerm) => {
    setSearchTerm(searchTerm)
  }

  return (
    <BrowserRouter>
      <Layout onSubmitSearch={handleSearch}>
        {currentUser && <Navbar onSubmitSearch={handleSearch} />}
        <div className="flex-grow">
          <Routes>
            {currentUser ? (
              <>
                <Route exact path="/" element={<Landing />} />
                <Route
                  path="/dashboard"
                  element={
                    <Dashboard
                      books={books}
                      isLoading={isLoading}
                      selectedCategoryTerm={handleSearch}
                    />
                  }
                />
                <Route
                  path="/searchResults"
                  element={
                    <SearchResults books={books} searchTerm={searchTerm} />
                  }
                />
                <Route path="/savedBooks" element={<SavedBooks />} />
                <Route path="/profile" element={<Profile />} />
                <Route
                  path="/books/:bookId"
                  element={<BookPage navigate={handleSearch} />}
                />
              </>
            ) : (
              <>
                <Route exact path="/" element={<Landing />} />
                <Route path="/dashboard" element={<Login />} />
                <Route path="/searchResults" element={<Login />} />
                <Route path="/savedBooks" element={<Login />} />
                <Route path="/profile" element={<Login />} />
                <Route path="/books/:bookId" element={<Login />} />
              </>
            )}
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Layout>
    </BrowserRouter>
  )
}

export default App
