import React from 'react'
import { PrimaryButton } from './Buttons'
import { Link } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import InfoIcon from '@mui/icons-material/Info';
import StarIcon from '@mui/icons-material/Star';


function BookContainer({ props }) {
  const { volumeInfo } = props

  return (
    <Link to={`/books/${props.id}`}>
      <div className='flex flex-row border-2 rounded-md w-96 m-2 justify-between'>
        <div className='w-24 mr-2'>
          <img className='w-full h-full' src={volumeInfo?.imageLinks?.thumbnail} alt={volumeInfo.title} />
        </div>
        <div className='flex flex-col justify-start'>
          <h2 className='font-bold'>{volumeInfo.title}</h2>
          <h3>{volumeInfo.authors}</h3>
          <div className='flex align-middle h-full'>
            <p>
              {volumeInfo.averageRating ? (
                <>
                  <span className='flex items-center'>
                    Rating: {volumeInfo.averageRating}
                    <StarIcon fontSize='small' className='w-4 h-4 ml-1 text-yellow-500' />
                  </span>
                </>
              ) : (
                'No ratings'
              )}
            </p>

          </div>
        </div>
        <div className='flex flex-col align-middle justify-center'>
          <PrimaryButton size="tiny" text={<FavoriteIcon />} />
          <PrimaryButton size="tiny" text={<InfoIcon />} />
        </div>
      </div >
    </Link>
  )
}

export default BookContainer
