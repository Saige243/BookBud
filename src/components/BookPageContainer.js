import React from 'react'
import { PrimaryButton } from './Buttons'
import FavoriteIcon from '@mui/icons-material/Favorite'
import InfoIcon from '@mui/icons-material/Info'
import StarIcon from '@mui/icons-material/Star'
import moment from 'moment'

function BookPageContainer({ props }) {
  const { volumeInfo } = props

  if (!volumeInfo) {
    return <div>Loading...</div>
  }

  const description = volumeInfo.description
  const formattedDescription = description.replace(/<[^>]*>/g, '')
  const formattedPublishDate = moment(volumeInfo.publishedDate).format(
    'MMMM D, YYYY'
  )

  return (
    <div className="h-screen flex flex-row w-full bg-BBwhite">
      {/* <div className="flex flex-col justify-center mr-2 text-center">
        <img
          className=""
          src={volumeInfo?.imageLinks?.thumbnail}
          alt={volumeInfo.title}
        />
        <div className="flex flex-col align-middle justify-center pt-4">
          <PrimaryButton size="tiny" text={<FavoriteIcon />} />
          <PrimaryButton size="tiny" text={<InfoIcon />} />
        </div>
        <div className="pt-2">
          <p className="pb-2">
            Pages:
            <br /> {volumeInfo.pageCount}
          </p>
          <p className="pb-2">
            Published:
            <br /> {formattedPublishDate}
          </p>
          {volumeInfo.categories && (
            <>
              <p>Genre:</p>
              {volumeInfo.categories.map((c, index) => (
                <p key={index}>{c}</p>
              ))}
            </>
          )}
        </div>
      </div> */}
      {/* <div className="flex flex-col w-full px-2">
        <div>
          <h1 className="font-bold">{volumeInfo?.title}</h1>
          <p className="italic">{volumeInfo?.subtitle}</p>
          <h2>{volumeInfo.authors}</h2>
          <div className="flex align-middle h-full">
            <p>
              {volumeInfo.averageRating ? (
                <>
                  <span className="flex items-center">
                    Rating: {volumeInfo.averageRating}
                    <StarIcon
                      fontSize="small"
                      className="w-4 h-4 ml-1 text-yellow-500"
                    />
                  </span>
                </>
              ) : (
                'No ratings'
              )}
            </p>
          </div>
        </div>
        <div className="pt-4">
          <p>{formattedDescription}</p>
        </div>
      </div> */}
    </div>
  )
}

export default BookPageContainer
