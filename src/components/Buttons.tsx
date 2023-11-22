import React from 'react'

export function PrimaryButton({
  text,
  onClick,
  type,
  size,
  className,
}: {
  text?: string | JSX.Element
  onClick?: React.MouseEventHandler
  type?: HTMLButtonElement['type']
  size?: string
  className?: string
}) {
  return (
    <button
      onClick={onClick}
      type={type}
      data-size={size}
      className={`m-2 p-2 bg-sky-600 border rounded-full text-white font-medium hover:bg-sky-500 ${className}`}
    >
      {text}
    </button>
  )
}
