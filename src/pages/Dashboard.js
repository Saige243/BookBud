import { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { useAuth } from "../auth/Auth";
import CircularProgress from '@mui/material/CircularProgress';
import { useGetBooks } from "../hooks/useGetBooks";


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
    <>
      <h2>Hi, {name}!</h2>
      <p>Email: {email}</p>
      <ul>
        {displayedBooks.map((book) => (
          <li key={book.id}>{book.volumeInfo.title}</li>
        ))}
      </ul>
    </>
  )
}

export default Dashboard
