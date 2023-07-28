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
  type?: any
  size?: any
  className: string
}) {
  return (
    <button
      onClick={onClick}
      type={type}
      data-size={size as string}
      className="m-2 p-2 bg-sky-600 border rounded-full text-white font-medium hover:bg-sky-500"
    >
      {text}
    </button>
  )
}
