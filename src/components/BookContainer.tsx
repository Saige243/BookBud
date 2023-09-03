import React from 'react'
import { PrimaryButton } from './Buttons'
import { Link } from 'react-router-dom'
import FavoriteIcon from '@mui/icons-material/Bookmark'
import Rating from '@mui/material/Rating'
import Modal from './Modal'
import { Book } from '../types'

interface BookContainerProps {
  id: string
  volumeInfo: Book
}

function BookContainer({ props }: { props: BookContainerProps }) {
  const { volumeInfo } = props

  const openModal = (id: string) => {
    // console.log('open modal', id)
  }

  return (
    <div className="flex flex-col rounded-md md:m-3 justify-between hover:opacity-80 pb-16">
      <Link to={`/books/${props.id}`}>
        <div className="flex flex-col justify-center w-24 md:w-36 mr-2">
          <div className="relative h-40 md:h-60">
            <div className="absolute h-60 w-20 opacity-0 hover:opacity-100">
              <div className="relative md:left-[87px]">
                <PrimaryButton
                  text={
                    <Modal modalText={<FavoriteIcon />} bookId={props.id} />
                  }
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
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
          <h2 className="font-unbounded md:font-lg truncate pt-2">
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
            <p className="hidden sm:flex pl-2 text-sm">
              {volumeInfo.averageRating}
            </p>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default BookContainer
