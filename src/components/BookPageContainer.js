import React from 'react'
import { PrimaryButton } from './Buttons'
import FavoriteIcon from '@mui/icons-material/Favorite';
import InfoIcon from '@mui/icons-material/Info';
import StarIcon from '@mui/icons-material/Star';


function BookPageContainer({ props }) {
  const { volumeInfo } = props

  if (!volumeInfo) {
    return <div>Loading...</div>;
  }

  const description = volumeInfo.description
  const formattedDescription = description.replace(/<[^>]*>/g, '');

  return (
    <div className='flex flex-row w-full m-2 justify-around'>
      <div className='mr-2'>
        <img className='' src={volumeInfo?.imageLinks?.thumbnail} alt={volumeInfo.title} />
        <div className='flex flex-col align-middle justify-center pt-4'>
          <PrimaryButton size="tiny" text={<FavoriteIcon />} />
          <PrimaryButton size="tiny" text={<InfoIcon />} />
        </div>
      </div>
      <div className='flex flex-col justify-start w-full px-2'>
        <h2 className='font-bold'>{volumeInfo?.title}</h2>
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
        <div>
          <p>{formattedDescription}</p>
        </div>
      </div>
    </div >
  )
}

export default BookPageContainer
