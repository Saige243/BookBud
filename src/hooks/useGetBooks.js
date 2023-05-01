import { useState, useEffect } from 'react';
import axios from 'axios';

const useGetBooks = () => {
  const [books, setBooks] = useState([])
  const apiKey = process.env.REACT_APP_GOOGLEBOOKS_API_KEY

  useEffect(() => {
    axios.get("https://www.googleapis.com/books/v1/volumes?q=" + 'iliad' + "&key=" + apiKey + "&maxResults=20").then((data) => {
      setBooks(data.data.items)
    })
  }, [])

  return {
    books,
  }
}

export { useGetBooks }


