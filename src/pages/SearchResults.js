import { useState, useEffect } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import BookContainer from '../components/BookContainer'

function SearchResults({ books, searchTerm }) {
  const [displayedBooks, setDisplayedBooks] = useState([])

  useEffect(() => {
    setDisplayedBooks(books)
  }, [books])

  // if (isLoading) {
  //   return (
  //     <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center">
  //       <CircularProgress />
  //     </div>
  //   )
  // }

  return (
    <div className="px-6 bg-BBwhite min-h-screen">
      {displayedBooks.length > 0 ? (
        <>
          <div className="flex justify-end">
            <h2 className="pr-6">Search results for: "{searchTerm}"</h2>
          </div>
          <div className="flex flex-row flex-wrap">
            {displayedBooks.map((book, i) => (
              <BookContainer props={book} key={i} />
            ))}
          </div>
        </>
      ) : (
        <h1>Search in the navbar just above!</h1>
      )}
    </div>
  )
}

export default SearchResults
