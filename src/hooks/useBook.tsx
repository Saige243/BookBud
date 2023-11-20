import { useState, useEffect } from 'react'
import axios from 'axios'
import AuthContext from '../auth/AuthContext'
import { useContext } from 'react'
import { SavedBook } from '../types'

const useBook = () => {
  const { currentUser } = useContext(AuthContext)
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

  const useGetSavedBooks = ({ ids }: { ids: string[] | undefined }) => {
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

  const useGetCurrentlyReading = ({ ids }: { ids: string[] | undefined }) => {
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

  const useGetFinishedBooks = ({ ids }: { ids: string[] | undefined }) => {
    const [finishedBooks, setFinishedBooks] = useState<string[]>([])

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
            setFinishedBooks(booksData)
            setIsLoading(false)
          })
          .catch((error) => {
            console.error('Error retrieving finished books:', error)
            setIsLoading(false)
          })
      }
    }, [ids])

    return {
      finishedBooks,
      isLoading,
    }
  }

  const addToCurrentlyReading = async (userId: string, bookId: SavedBook[]) => {
    try {
      const savedBooks = currentUser?.savedBooks.map((book: SavedBook[]) =>
        book.map((item) => item.bookId.bookId)
      )
      const isBookAlreadySaved = Object.values(savedBooks).some((bookArray) =>
        bookArray.includes(bookId.bookId)
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

  const removeFromCurrentlyReading = async (
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

  const saveBook = async (userId: string, bookId: SavedBook[]) => {
    try {
      const savedBooks = currentUser?.savedBooks.map((book: SavedBook[]) =>
        book.map((item) => item.bookId.bookId)
      )
      const isBookAlreadySaved = Object.values(savedBooks).some((bookArray) =>
        bookArray.includes(bookId.bookId)
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

  const removeFromWantToRead = async (
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

  const addToFinished = async (userId: string, bookId: SavedBook[]) => {
    try {
      const response = await axios.post(
        'http://localhost:3001/books/finished',
        {
          userId: userId,
          bookId: bookId,
        }
      )
      return response.data
    } catch (error) {
      console.error('Error on addToFinished:', error)
      throw new Error('Add to finished failed')
    }
  }

  const removeFromFinished = async (
    userId: string,
    bookId: { bookId: string | undefined }
  ) => {
    try {
      const response = await axios.delete(
        'http://localhost:3001/books/finished',
        {
          params: {
            userId: userId,
            bookId: bookId,
          },
        }
      )
      return response.data
    } catch (error) {
      console.error('Error on removeBookFromFinished:', error)
      throw new Error('Remove book from finished failed')
    }
  }

  return {
    useGetBook,
    useGetSavedBooks,
    saveBook,
    removeFromWantToRead,
    addToCurrentlyReading,
    removeFromCurrentlyReading,
    useGetCurrentlyReading,
    useGetFinishedBooks,
    addToFinished,
    removeFromFinished,
    isLoading,
  }
}

export default useBook
