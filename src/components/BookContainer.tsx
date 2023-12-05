import React from 'react'
import { PrimaryButton } from './Buttons'
import { Link } from 'react-router-dom'
import FavoriteIcon from '@mui/icons-material/Bookmark'
import Rating from '@mui/material/Rating'
import Modal from './Modal'
import { BookContainerProps } from '../types'

function BookContainer({ props }: { props: BookContainerProps }) {
  const { volumeInfo } = props

  return (
    <div className="flex flex-col rounded-md md:m-3 justify-between hover:opacity-80 pb-4">
      <Link to={`/books/${props.id}`}>
        <div className="flex flex-col justify-center w-24 2xl:w-36 mr-2">
          <div className="relative h-40 2xl:h-60">
            <div className="absolute h-60 w-full opacity-0 hover:opacity-100">
              <div className="relative left-[43px] top-[100px] 2xl:left-[85px] 2xl:top-[180px]">
                <PrimaryButton
                  text={
                    <Modal modalText={<FavoriteIcon />} bookId={props.id} />
                  }
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                    event.preventDefault()
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
          <h2 className="font-unbounded text-xs md:text-sm truncate pt-2">
            {volumeInfo.title}
          </h2>
          <h3 className="font-montserrat text-xs md:text-sm lg:text-base truncate">
            {volumeInfo.authors}
          </h3>
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
