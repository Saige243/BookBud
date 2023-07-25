import React from 'react'
import { PrimaryButton } from './Buttons'
import { Link } from 'react-router-dom'
import FavoriteIcon from '@mui/icons-material/Bookmark'
import useBook from '../hooks/useBook'
import AuthContext from '../auth/AuthContext'
import Rating from '@mui/material/Rating'
import Modal from './Modal'

function BookContainer({ props }) {
  const { currentUser } = React.useContext(AuthContext)
  const { volumeInfo } = props
  const { saveBook } = useBook()

  const openModal = (id) => {
    // console.log('open modal', id)
  }

  return (
    <div className="flex flex-col rounded-md m-3 justify-between hover:opacity-80 pb-16">
      <Link to={`/books/${props.id}`}>
        <div className="flex flex-col justify-center w-36 mr-2">
          <div className="relative h-60">
            <div className="absolute h-60 w-36 opacity-0 hover:opacity-100">
              <div className="relative left-[87px]">
                <PrimaryButton
                  text={
                    <Modal modalText={<FavoriteIcon />} bookId={props.id} />
                  }
                  onClick={(event) => {
                    event.preventDefault()
                    openModal(props.id)
                  }}
                />
              </div>
            </div>
            <img
              className="object-cover w-full h-full rounded-md"
              src={volumeInfo?.imageLinks?.thumbnail}
              alt={volumeInfo.title}
            />
          </div>
          <h2 className="font-bold font-unbounded font-lg truncate pt-2">
            {volumeInfo.title}
          </h2>
          <h3 className="font-montserrat truncate">{volumeInfo.authors}</h3>
          <div className="flex place-items-center">
            <Rating
              name="read-only"
              value={volumeInfo.averageRating}
              size="small"
              precision={0.5}
              readOnly
            />
            <p className="pl-2 text-sm">{volumeInfo.averageRating}</p>
          </div>
        </div>
      </Link>
      {/* <div className="flex flex-col align-middle justify-center">
        <PrimaryButton
          size="tiny"
          text={<FavoriteIcon />}
          onClick={() => saveBook(currentUser._id, { bookId: props.id })}
        />
        <PrimaryButton size="tiny" text={<InfoIcon />} />
      </div> */}
    </div>
  )
}

export default BookContainer
