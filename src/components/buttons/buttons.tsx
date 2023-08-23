import React from 'react'

export const PrimaryButton = ({
  text,
  onClick,
  className,
  color,
  type,
}: {
  text?: string
  onClick?: React.MouseEventHandler
  className?: string
  color?: string
  type?: string
}) => {
  return (
    <button
      onClick={onClick}
      className={`bg-${color} hover:opacity-80 font-unbounded py-2 px-4 focus:outline-none focus:shadow-outline rounded-full ${className} `}
    >
      {text}
    </button>
  )
}

export const GhostButton = ({
  text,
  onClick,
  className,
}: {
  text: string
  onClick: React.MouseEventHandler
  className: string
}) => {
  return (
    <button
      onClick={onClick}
      className={`text-BBprimary1 font-unbounded hover:opacity-70 border-2 border-BBprimary1 rounded-full ${className}`}
    >
      {text}
    </button>
  )
}
