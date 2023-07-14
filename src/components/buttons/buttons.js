export const PrimaryButton = ({ text, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-BBgreen hover:opacity-80 text-BBprimary1 font-unbounded py-2 px-4 rounded focus:outline-none focus:shadow-outline ${className} rounded-full`}
    >
      {text}
    </button>
  )
}

export const GhostButton = ({ text, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-transparent text-BBprimary1 font-unbounded hover:opacity-70 py-2 px-4 border-2 border-BBprimary1 rounded-full ${className}`}
    >
      {text}
    </button>
  )
}
