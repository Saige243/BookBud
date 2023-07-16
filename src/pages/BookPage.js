import React from 'react'
import moment from 'moment'
import { useState, useEffect } from 'react'
import useBook from '../hooks/useBook'
import { useParams } from 'react-router-dom'
import { GhostButton } from '../components/buttons/buttons'
import orangeBook from '../assets/images/icons/orangeBook.svg'
import star from '../assets/images/icons/Star.svg'
import AuthContext from '../auth/AuthContext'
import { ToastContainer, toast } from 'react-toastify'

function BookPage() {
  const { bookId } = useParams()
  const { useGetBook, saveBook } = useBook()
  const { book, isLoading } = useGetBook(bookId)
  const [displayBook, setDisplayBook] = useState({})
  const [showFullDescription, setShowFullDescription] = useState(false)
  const { currentUser } = React.useContext(AuthContext)

  useEffect(() => {
    setDisplayBook(book)
  }, [bookId, book])
  const { volumeInfo } = displayBook

  if (!volumeInfo) {
    return <div>Loading...</div>
  }

  const description = volumeInfo.description
  const formattedDescription = description.replace(/<[^>]*>/g, '')
  const formattedPublishDate = moment(volumeInfo.publishedDate).format(
    'MMMM D, YYYY'
  )

  const truncatedDescription = showFullDescription
    ? formattedDescription
    : formattedDescription.slice(0, 800) + '...'

  const handleToggleDescription = () => {
    setShowFullDescription(!showFullDescription)
  }

  const handleSaveBook = () => {
    saveBook(currentUser._id, { bookId: bookId })
      .then((res) => {
        toast.success(`${volumeInfo.title} added to library!`)
      })
      .catch((error) => {
        toast.warning(`${volumeInfo.title} is already in your library`)
      })
  }

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
      <div className="h-screen flex w-full justify-center bg-BBblue">
        <div className="flex flex-col w-full md:w-3/6 px-20 bg-BBwhite">
          <div className="grid grid-cols-3 pt-4">
            <div className="flex flex-col place-items-center justify-center pt-2 text-center space-y-6">
              <div className="flex space-x-4">
                <img src={orangeBook} alt="Logo" className="h-50" />
                <div className="">
                  <p className="font-unbounded text-md">
                    {volumeInfo.pageCount}
                  </p>
                  <p className="font-montserrat text-xs">Pages</p>
                </div>
              </div>
              <div className="flex space-x-4">
                <img src={star} alt="Logo" className="h-50" />
                <div className="">
                  <p className="font-unbounded text-md">
                    {volumeInfo.averageRating}
                  </p>
                  <p className="font-montserrat text-xs">Rating</p>
                </div>
              </div>
            </div>
            <img
              className="mx-auto rounded-md h-80"
              src={volumeInfo?.imageLinks?.thumbnail}
              alt={volumeInfo.title}
            />
            <div className="flex flex-col justify-center space-y-4 p-4">
              <GhostButton
                text="Add to Library"
                className="text-xs/10"
                // onClick={() => console.log('Clicked!')}
                onClick={() => handleSaveBook()}
              />
              <GhostButton text="Currently Reading" className="text-xs/10" />
            </div>
          </div>
          <div className="pt-8">
            <h1 className="font-unbounded text-2xl">{volumeInfo?.title}</h1>
            <h2 className="font-unbounded text-md">
              {volumeInfo.authors.length > 1 ? (
                <>
                  {volumeInfo.authors.slice(0, -1).join(', ')} &{' '}
                  {volumeInfo.authors.slice(-1)}
                </>
              ) : (
                volumeInfo.authors[0]
              )}
            </h2>
            <div className="flex align-middle h-full"></div>
          </div>
          <div className="pt-4">
            <h2 className="font-unbounded text-sm">Description</h2>
            <p className="font-montserrat">
              {truncatedDescription}
              <span
                className="text-BBmagenta cursor-pointer font-montserrat text-sm font-extrabold"
                onClick={handleToggleDescription}
              >
                {showFullDescription ? ' READ LESS' : 'READ MORE'}
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default BookPage
