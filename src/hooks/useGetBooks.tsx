import { useState, useEffect } from 'react'
import axios from 'axios'

const useGetBooks = (searchTerm: string) => {
  const [books, setBooks] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const apiKey = process.env.REACT_APP_GOOGLEBOOKS_API_KEY

  useEffect(() => {
    if (searchTerm) {
      setIsLoading(true)
      axios
        .get(
          'https://www.googleapis.com/books/v1/volumes?q=' +
            searchTerm +
            '&key=' +
            apiKey +
            '&maxResults=20'
        )
        .then((data) => {
          setBooks(data.data.items)
        })
      setIsLoading(false)
    }
  }, [searchTerm, apiKey])

  return {
    books,
    isLoading,
  }
}

export { useGetBooks }
