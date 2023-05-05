import React from 'react'
import { PrimaryButton } from './Buttons'

function BookContainer({ props }) {
  const { volumeInfo } = props

  console.log('book img:', volumeInfo)
  return (
    <div className='flex flex-row border-2 rounded-md w-96'>
      <div className='w-20 h-28 mr-2'>
        <img className='w-full h-full' src={volumeInfo?.imageLinks?.thumbnail} alt={volumeInfo.title} />
      </div>
      <div className='flex flex-col'>
        <h2>{volumeInfo.title}</h2>
        <h3>{volumeInfo.authors}</h3>
        <div className='flex flex-row '>
          <PrimaryButton text='Save' size="small" />
          <PrimaryButton text='Info' size="small" />

        </div>
      </div>
    </div>
  )
}

export default BookContainer
