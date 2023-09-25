import React from 'react'
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
import Community from './pages/Community'
import MobileNav from './components/MobileNav'

function App() {
  const { currentUser } = useContext(AuthContext)
  const [searchTerm, setSearchTerm] = useState('nyt best sellers')
  const { books, isLoading } = useGetBooks(searchTerm)

  const handleSearch = async (searchTerm: string) => {
    setSearchTerm(searchTerm)
  }

  return (
    <BrowserRouter>
      {currentUser && <Navbar onSubmitSearch={handleSearch} />}
      {currentUser && <MobileNav />}
      <div className="flex-grow">
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Landing />} />
            <Route
              path="/dashboard"
              element={
                <Dashboard
                  bookIds={books}
                  isLoading={isLoading}
                  selectedCategoryTerm={handleSearch}
                />
              }
            />
            <Route
              path="/searchResults"
              element={
                <SearchResults
                  books={books}
                  searchTerm={searchTerm}
                  isLoading={isLoading}
                />
              }
            />
            <Route path="/savedBooks" element={<SavedBooks />} />
            <Route path="/community" element={<Community />} />
            <Route path="/profile" element={<Profile />} />
            <Route
              path="/books/:bookId"
              element={<BookPage navigate={handleSearch} />}
            />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
