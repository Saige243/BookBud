import React from 'react'
import { useContext } from 'react'
import AuthContext from '../auth/AuthContext'
import { useState } from 'react'
import useBook from '../hooks/useBook'
import SavedBookContainer from '../components/SavedBookContainer'
import CurrentlyReadingContainer from '../components/CurrentlyReadingContainer'
import LoadingSpinner from '../components/LoadingSpinner'

function SavedBooks() {
  const { currentUser } = useContext(AuthContext)
  const { useGetSavedBooks, useGetCurrentlyReading, isLoading } = useBook()

  const [currentlyReading, setCurrentlyReading] = useState(
    currentUser?.currentlyReading.map((item: any) => item[0].bookId.bookId)
  )
  const [savedBooks, setSavedBooks] = useState(
    currentUser?.savedBooks.map((item: any) => item[0].bookId.bookId)
  )

  const { savedBooks: savedBooksData } = useGetSavedBooks({
    ids: savedBooks,
  })

  const { currentlyReading: currentlyReadingData } = useGetCurrentlyReading({
    ids: currentlyReading,
  })

  return (
    <div className="min-h-screen bg-BBwhite px-6">
      <div>
        <h1 className="font-unbounded">Currently Reading</h1>
      </div>
      {isLoading ? (
        <div className="flex justify-center h-screen place-items-center">
          <div className="relative bottom-20">
            <LoadingSpinner />
          </div>
        </div>
      ) : (
        <>
          {currentlyReadingData.length > 0 ? (
            <div className="flex flex-row flex-wrap justify-evenly">
              {currentlyReadingData.map((book) => (
                <CurrentlyReadingContainer key={book} props={book} />
              ))}
            </div>
          ) : (
            <h1>
              You've got no books currently reading! Click the heart button on a
              book after searching to add.
            </h1>
          )}

          {savedBooksData.length > 0 ? (
            <>
              <div className="flex">
                <h2 className="font-unbounded">Want to read</h2>
              </div>
              <div className="flex flex-row flex-wrap justify-evenly">
                {savedBooksData.map((book, i) => (
                  <SavedBookContainer props={book} key={i} />
                ))}
              </div>
            </>
          ) : (
            <h1>
              You've got no favorites yet! Click the heart button on a book
              after searching to add.
            </h1>
          )}
        </>
      )}
    </div>
  )
}

export default SavedBooks
