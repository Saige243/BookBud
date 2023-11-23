import React from 'react'
import { useContext } from 'react'
import AuthContext from '../auth/AuthContext'
import { useState, useEffect } from 'react'
import useBook from '../hooks/useBook'
import SavedBookContainer from '../components/SavedBookContainer'
import CurrentlyReadingContainer from '../components/CurrentlyReadingContainer'
import LoadingSpinner from '../components/LoadingSpinner'
import { ToastContainer } from 'react-toastify'

function MyBooks() {
  const { currentUser } = useContext(AuthContext)
  const {
    useGetWantToReadBooks,
    useGetCurrentlyReading,
    useGetFinishedBooks,
    isLoading,
  } = useBook()

  const [currentlyReading, setCurrentlyReading] = useState([])
  const [savedBooks, setSavedBooks] = useState([])
  const [finishedBooks, setFinishedBooks] = useState([])

  useEffect(() => {
    setCurrentlyReading(
      currentUser?.currentlyReading.map(
        (item: { bookId: string }) => item[0].bookId
      ) || []
    )
    setSavedBooks(
      currentUser?.savedBooks.map(
        (item: { bookId: string }) => item[0].bookId
      ) || []
    )
    setFinishedBooks(
      currentUser?.finishedBooks.map(
        (item: { bookId: string }) => item[0].bookId
      ) || []
    )
  }, [currentUser])

  const { savedBooks: savedBooksData } = useGetWantToReadBooks({
    ids: savedBooks,
  })

  const { currentlyReading: currentlyReadingData } = useGetCurrentlyReading({
    ids: currentlyReading,
  })

  const { finishedBooks: finishedBooksData } = useGetFinishedBooks({
    ids: finishedBooks,
  })

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className="min-h-screen bg-BBwhite px-6">
        <div>
          <h1 className="font-unbounded">Currently Reading</h1>
        </div>
        {isLoading ? (
          <div className="flex justify-center h-screen place-items-center">
            <div className="relative bottom-28">
              <LoadingSpinner />
            </div>
          </div>
        ) : (
          <>
            {currentlyReadingData.length > 0 ? (
              <div className="flex flex-row flex-wrap">
                {currentlyReadingData.map((book: any) => (
                  <CurrentlyReadingContainer key={book.id} props={book} />
                ))}
              </div>
            ) : (
              <h1 className="pb-20">
                You've got no books currently reading! Click the heart button on
                a book after searching to add.
              </h1>
            )}

            <div className="flex">
              <h2 className="font-unbounded">Want to read</h2>
            </div>
            {savedBooksData.length > 0 ? (
              <>
                <div className="flex flex-row flex-wrap">
                  {savedBooksData.map((book: any) => (
                    <SavedBookContainer
                      props={book}
                      key={book.id}
                      innerText="Remove from want to read?"
                    />
                  ))}
                </div>
              </>
            ) : (
              <h1 className="pb-20">
                You've got no favorites yet! Click the heart button on a book
                after searching to add.
              </h1>
            )}

            <div className="flex">
              <h2 className="font-unbounded">Finished</h2>
            </div>
            {finishedBooksData.length > 0 ? (
              <>
                <div className="flex flex-row flex-wrap">
                  {finishedBooksData.map((book: any) => (
                    <SavedBookContainer
                      props={book}
                      key={book.id}
                      innerText="Remove from finished?"
                    />
                  ))}
                </div>
              </>
            ) : (
              <h1 className="pb-20">
                You haven't finished anything yet! Keep reading!
              </h1>
            )}
          </>
        )}
      </div>
    </>
  )
}

export default MyBooks
