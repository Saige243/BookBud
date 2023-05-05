import { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { useAuth } from "../auth/Auth";
import CircularProgress from '@mui/material/CircularProgress';
import { useGetBooks } from "../hooks/useGetBooks";
import BookContainer from '../components/BookContainer';

function Dashboard({ searchTerm }) {
  const { isLoading } = useAuth0();
  const { userMetadata } = useAuth()
  const { name, email } = userMetadata
  const { books } = useGetBooks(searchTerm);
  const [displayedBooks, setDisplayedBooks] = useState([]);

  useEffect(() => {
    setDisplayedBooks(books);
  }, [searchTerm, books]);


  if (isLoading) {
    return (
      <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center">
        <CircularProgress />
      </div>
    )
  }

  return (
    <div className='pl-6 pr-6'>
      <h2>Hi, {name}!</h2>
      <p>Email: {email}</p>
      <div className='flex justify-center flex-row flex-wrap'>
        {displayedBooks.map((book) => (
          <BookContainer
            props={book}
          />
        ))}
      </div>
    </div>
  )
}

export default Dashboard
