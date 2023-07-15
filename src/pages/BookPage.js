import { useState, useEffect } from 'react'
import useBook from '../hooks/useBook'
import { useParams } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress'
import BookPageContainer from '../components/BookPageContainer'

function BookPage() {
  const { bookId } = useParams()
  const { useGetBook } = useBook()
  const { book, isLoading } = useGetBook(bookId)
  const [displayBook, setDisplayBook] = useState({})
  useEffect(() => {
    setDisplayBook(book)
  }, [bookId, book])

  if (isLoading) {
    return (
      <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-BBwhite">
        <CircularProgress />
      </div>
    )
  }

  return (
    <div className="">
      <BookPageContainer props={displayBook} />
    </div>
  )
}

export default BookPage
