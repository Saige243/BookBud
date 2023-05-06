import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const useGetBooks = (searchTerm) => {
  const [books, setBooks] = useState([]);
  const apiKey = process.env.REACT_APP_GOOGLEBOOKS_API_KEY;
  const location = useLocation();
  const navigate = useNavigate()

  console.log('location:', location.pathname)
  console.log('x:', searchTerm)

  useEffect(() => {
    if (location.pathname !== '/dashboard') {
      navigate('/dashboard')
    }

    if (searchTerm) {
      axios.get("https://www.googleapis.com/books/v1/volumes?q=" + searchTerm + "&key=" + apiKey + "&maxResults=20")
        .then((data) => {
          setBooks(data.data.items);
        });
    }
  }, [searchTerm, apiKey, location]);

  return {
    books,
  };
};

export { useGetBooks };
