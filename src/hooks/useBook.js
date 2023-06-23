import { useState, useEffect } from 'react'
import axios from 'axios'

const apiKey = process.env.REACT_APP_GOOGLEBOOKS_API_KEY

const useBook = () => {
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

  const saveBook = async (userId, bookId) => {
    try {
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
  }
}

export default useBook
