import React from 'react'

export function PrimaryButton({ text, onClick, type }) {
  return (
    <button onClick={onClick} type={type} className='m-2 p-3 bg-sky-600 border rounded text-white font-medium hover:bg-sky-500'>{text}</button>
  )
}

