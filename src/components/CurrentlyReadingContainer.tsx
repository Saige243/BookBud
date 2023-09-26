import React from 'react'
import { Link } from 'react-router-dom'
import EditModal from './EditModal'
import { PrimaryButton } from './Buttons'
import useBook from '../hooks/useBook'
import EditIcon from '@mui/icons-material/Edit'

const CurrentlyReadingContainer = ({ props }) => {
  const { volumeInfo } = props
  const { saveBook } = useBook()

  const [isModalOpen, setIsModalOpen] = React.useState(false)

  const openModal = (id) => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const truncatedTitle =
    volumeInfo.title.length > 25
      ? `${volumeInfo.title.slice(0, 40)}...`
      : volumeInfo.title

  return (
    <Link to={`/books/${props.id}`}>
      <div
        className="h-24 w-72 book-container rounded-[10px] shadow-xl flex mx-2 mt-3 mb-12 hover:opacity-80"
        onMouseEnter={() => setIsModalOpen(true)}
        onMouseLeave={() => setIsModalOpen(false)}
      >
        <img
          src={volumeInfo.imageLinks.thumbnail}
          alt={volumeInfo.title}
          className="h-full rounded-l-[10px] object-cover"
        />
        <div className="pl-4 pt-2">
          <h1 className="text-sm font-unbounded">{truncatedTitle}</h1>
          <p className="text-sm font-unbounded">{volumeInfo.authors}</p>
        </div>
        {isModalOpen && (
          <div className="absolute h-24 w-72">
            <div className="relative left-[230px] top-[32px]">
              <PrimaryButton
                text={
                  <EditModal
                    modalText={<EditIcon />}
                    bookId={props.id}
                    closeModal={closeModal}
                    innerText="Remove from currently reading?"
                    parentComponent="currentlyReading"
                  />
                }
                onClick={(event) => {
                  event.preventDefault()
                  openModal(props.id)
                }}
              />
            </div>
          </div>
        )}
      </div>
    </Link>
  )
}

export default CurrentlyReadingContainer
