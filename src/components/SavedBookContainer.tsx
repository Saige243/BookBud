import React from 'react'
import { PrimaryButton } from './Buttons'
import { Link } from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit'
import Rating from '@mui/material/Rating'
import EditModal from './EditModal'

function SavedBookContainer({
  props,
  innerText,
}: {
  props: any
  innerText: string
}) {
  const { volumeInfo } = props

  return (
    <div className="flex flex-col rounded-md m-3 justify-around hover:opacity-80 pb-">
      <Link to={`/books/${props.id}`}>
        <div className="flex flex-col justify-center w-24 2xl:w-36 mr-2">
          <div className="relative h-40 2xl:h-60">
            <div className="absolute h-60 w-36 opacity-0 hover:opacity-100">
              <div className="relative left-[43px] top-[100px] 2xl:left-[85px] 2xl:top-[180px]">
                <PrimaryButton
                  text={
                    <EditModal
                      modalText={<EditIcon />}
                      bookId={props.id}
                      innerText={innerText}
                      parentComponent="savedbooks"
                    />
                  }
                  onClick={(event) => {
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
    </div>
  )
}

export default SavedBookContainer
