import { useState, useEffect } from 'react';
import axios from 'axios';

const useGetBook = (id) => {
  const [book, setBook] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const apiKey = process.env.REACT_APP_GOOGLEBOOKS_API_KEY

  useEffect(() => {
    if (id) {
      setIsLoading(true)
      axios.get(`https://www.googleapis.com/books/v1/volumes/${id}`).then((data) => {
        setBook(data.data)
      })
      setIsLoading(false)
    }
  }, [id, apiKey])

  return {
    book,
    isLoading
  }
}

export { useGetBook }


