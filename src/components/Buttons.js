import React from 'react'

export function PrimaryButton({ text, onClick }) {
  return (
    <button onClick={onClick} className='m-2 p-3 bg-sky-600 border rounded text-white font-medium hover:bg-sky-500'>{text}</button>
  )
}

