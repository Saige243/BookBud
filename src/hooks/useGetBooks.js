import { useState, useEffect } from 'react';
import axios from 'axios';

const useGetBooks = (searchTerm) => {
  const [books, setBooks] = useState([]);
  const apiKey = process.env.REACT_APP_GOOGLEBOOKS_API_KEY;

  useEffect(() => {
    if (searchTerm) {
      axios.get("https://www.googleapis.com/books/v1/volumes?q=" + searchTerm + "&key=" + apiKey + "&maxResults=20")
        .then((data) => {
          setBooks(data.data.items);
        });
    }
  }, [searchTerm, apiKey]);

  return {
    books,
  };
};

export { useGetBooks };
