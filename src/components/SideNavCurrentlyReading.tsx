import React from 'react'
import { Link } from 'react-router-dom'

const SideNavCurrentlyReading = ({ props }) => {
  const { volumeInfo } = props

  const truncatedTitle =
    volumeInfo.title.length > 20
      ? `${volumeInfo.title.slice(0, 20)}...`
      : volumeInfo.title

  return (
    <Link to={`/books/${props.id}`}>
      <div className="h-[90px] w-52 book-container space-x-2 rounded-[10px] shadow-xl flex m-2 hover:opacity-80">
        <div>
          <img
            src={volumeInfo.imageLinks.thumbnail}
            alt={volumeInfo.title}
            className="h-full rounded-l-[10px] object-fit"
          />
        </div>
        <div className="pt-2">
          <h1 className="text-xs font-unbounded text-BBprimary1">
            {truncatedTitle}
          </h1>
          <p className="pt-1 text-[10px] font-unbounded text-BBprimary1">
            {volumeInfo.authors}
          </p>
        </div>
      </div>
    </Link>
  )
}

export default SideNavCurrentlyReading
