import { useState, useEffect } from 'react'
import axios from 'axios'
import AuthContext from '../auth/AuthContext'
import { useContext } from 'react'

const apiKey = process.env.REACT_APP_GOOGLEBOOKS_API_KEY

const useBook = () => {
  const { currentUser } = useContext(AuthContext)

  const useGetBook = (id) => {
    const [book, setBook] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
      if (id) {
        setIsLoading(true)
        axios
          .get(`https://www.googleapis.com/books/v1/volumes/${id}`)
          .then((data) => {
            setBook(data.data)
          })
        setIsLoading(false)
      }
    }, [id])

    return {
      book,
      isLoading,
    }
  }

  const useGetSavedBooks = ({ ids }) => {
    const [savedBooks, setSavedBooks] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
      if (ids && ids.length > 0) {
        setIsLoading(true)
        Promise.all(
          ids.map((id) =>
            axios.get(`https://www.googleapis.com/books/v1/volumes/${id}`)
          )
        )
          .then((responses) => {
            const booksData = responses.map((response) => response.data)
            setSavedBooks(booksData)
            setIsLoading(false)
          })
          .catch((error) => {
            console.error('Error retrieving saved books:', error)
            setIsLoading(false)
          })
      }
    }, [ids])

    return {
      savedBooks,
      isLoading,
    }
  }

  const useGetCurrentlyReading = ({ ids }) => {
    const [currentlyReading, setCurrentlyReading] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
      if (ids && ids.length > 0) {
        setIsLoading(true)
        Promise.all(
          ids.map((id) =>
            axios.get(`https://www.googleapis.com/books/v1/volumes/${id}`)
          )
        )
          .then((responses) => {
            const booksData = responses.map((response) => response.data)
            setCurrentlyReading(booksData)
            setIsLoading(false)
          })
          .catch((error) => {
            console.error('Error retrieving currently reading:', error)
            setIsLoading(false)
          })
      }
    }, [ids])

    return {
      currentlyReading,
      isLoading,
    }
  }

  const addToCurrentlyReading = async (userId, bookId) => {
    try {
      const savedBooks = currentUser.savedBooks.map((book) =>
        book.map((item) => item.bookId.bookId)
      )
      const isBookAlreadySaved = Object.values(savedBooks).some((bookArray) =>
        bookArray.includes(bookId)
      )
      if (isBookAlreadySaved) {
        throw new Error("You're already reading this book")
      } else {
        const response = await axios.post(
          'http://localhost:3001/books/currently-reading',
          {
            userId: userId,
            bookId: bookId,
          }
        )
        return response.data
      }
    } catch (error) {
      console.error('Error on saveBook:', error)
      throw new Error('Save book failed')
    }
  }

  const saveBook = async (userId, bookId) => {
    try {
      const savedBooks = currentUser.savedBooks.map((book) =>
        book.map((item) => item.bookId.bookId)
      )
      const isBookAlreadySaved = Object.values(savedBooks).some((bookArray) =>
        bookArray.includes(bookId)
      )
      if (isBookAlreadySaved) {
        throw new Error('Book is already in library')
      }

      const response = await axios.post('http://localhost:3001/books', {
        userId: userId,
        bookId: bookId,
      })

      return response.data
    } catch (error) {
      console.error('Error on saveBook:', error)
      throw new Error('Save book failed')
    }
  }

  return {
    useGetBook,
    useGetSavedBooks,
    saveBook,
    addToCurrentlyReading,
    useGetCurrentlyReading,
  }
}

export default useBook
