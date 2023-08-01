import { useState, useEffect } from 'react'
import axios from 'axios'
import AuthContext from '../auth/AuthContext'
import { useContext } from 'react'
import { debounce } from 'lodash'
import { User } from '../types'

const useBook = () => {
  const { currentUser }: any = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(false)

  const useGetBook = (id: string | undefined) => {
    const [book, setBook] = useState([])

    useEffect(() => {
      if (id) {
        setIsLoading(true)
        axios
          .get(`https://www.googleapis.com/books/v1/volumes/${id}`)
          .then((data) => {
            setBook(data.data)
            setIsLoading(false)
          })
          .catch((error) => {
            console.error('Error fetching book:', error)
            setIsLoading(false)
          })
      }
    }, [id])

    return {
      book,
      isLoading,
    }
  }

  const useGetSavedBooks = ({ ids }: { ids: string[] }) => {
    const [savedBooks, setSavedBooks] = useState<string[]>([])

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

  const useGetCurrentlyReading = ({ ids }: { ids: string[] }) => {
    const [currentlyReading, setCurrentlyReading] = useState<string[]>([])

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

  const addToCurrentlyReading = async (
    userId: string,
    bookId: { bookId: string | undefined }
  ) => {
    try {
      const savedBooks = currentUser.savedBooks.map((book: string[]) =>
        book.map((item: any) => item.bookId.bookId)
      )
      const isBookAlreadySaved = Object.values(savedBooks).some(
        (bookArray: any) => bookArray.includes(bookId.bookId)
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
      console.error('Error on addToCurrentlyReading:', error)
      throw new Error('Add to currently reading failed')
    }
  }

  const removeBookFromCurrentlyReading = async (
    userId: string,
    bookId: { bookId: string | undefined }
  ) => {
    try {
      const response = await axios.delete(
        'http://localhost:3001/books/currently-reading',
        {
          params: {
            userId: userId,
            bookId: bookId,
          },
        }
      )
      return response.data
    } catch (error) {
      console.error('Error on removeBookFromCurrentlyReading:', error)
      throw new Error('Remove book from currently reading failed')
    }
  }

  const saveBook = async (
    userId: string,
    bookId: { bookId: string | undefined }
  ) => {
    try {
      const savedBooks = currentUser.savedBooks.map((book: string[]) =>
        book.map((item: any) => item.bookId.bookId)
      )
      const isBookAlreadySaved = Object.values(savedBooks).some(
        (bookArray: any) => bookArray.includes(bookId.bookId)
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

  const removeBookFromSaved = async (
    userId: string,
    bookId: { bookId: string | undefined }
  ) => {
    try {
      const response = await axios.delete('http://localhost:3001/books', {
        params: {
          userId: userId,
          bookId: bookId,
        },
      })
      return response.data
    } catch (error) {
      console.error('Error on removeBookFromSaved:', error)
      throw new Error('Remove book from saved books failed')
    }
  }

  return {
    useGetBook,
    useGetSavedBooks,
    saveBook,
    removeBookFromSaved,
    addToCurrentlyReading,
    removeBookFromCurrentlyReading,
    useGetCurrentlyReading,
    isLoading,
  }
}

export default useBook
