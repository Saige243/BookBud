import { useState, useEffect } from 'react'
import axios from 'axios'

const useBook = () => {
  const useGetBook = (id) => {
    const [book, setBook] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const apiKey = process.env.REACT_APP_GOOGLEBOOKS_API_KEY

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
    }, [id, apiKey])

    return {
      book,
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
    saveBook,
  }
}

export default useBook
