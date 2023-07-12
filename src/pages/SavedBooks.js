import { useContext } from 'react'
import AuthContext from '../auth/AuthContext'
import { useState } from 'react'
import useBook from '../hooks/useBook'
import BookContainer from '../components/BookContainer'

function SavedBooks() {
  const { currentUser } = useContext(AuthContext)
  const { useGetSavedBooks } = useBook()
  const [savedBooks, setSavedBooks] = useState(
    currentUser.savedBooks.map((item) => item[0].bookId.bookId)
  )

  const { savedBooks: savedBooksData, isLoading } = useGetSavedBooks({
    ids: savedBooks,
  })

  return (
    <div className="px-6">
      {savedBooksData.length > 0 && !isLoading ? (
        <>
          <div className="flex">
            <h2>{currentUser.firstName}'s favorites:</h2>
          </div>
          <div className="flex justify-center flex-row flex-wrap">
            {savedBooksData.map((book, i) => (
              <BookContainer props={book} key={i} />
            ))}
          </div>
        </>
      ) : (
        <h1>
          You've got no favorites yet! Click the heart button on a book after
          searching to add.
        </h1>
      )}
    </div>
  )
}

export default SavedBooks
