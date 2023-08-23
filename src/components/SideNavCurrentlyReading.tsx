import React from 'react'
import { Link } from 'react-router-dom'

const SideNavCurrentlyReading = ({ props }) => {
  const { volumeInfo } = props

  const truncatedTitle =
    volumeInfo.title.length > 20
      ? `${volumeInfo.title.slice(0, 40)}...`
      : volumeInfo.title

  return (
    <Link to={`/books/${props.id}`}>
      <div className="h-[90px] w-52 book-container rounded-[20px] shadow-xl flex m-2 hover:opacity-80">
        <div className="">
          <img
            src={volumeInfo.imageLinks.thumbnail}
            alt={volumeInfo.title}
            className="h-full rounded-l-[20px] object-fit"
          />
        </div>
        <div className="pt-2">
          <h1 className="text-xs font-unbounded text-BBprimary1">
            {truncatedTitle}
          </h1>
          <p className="text-[10px] font-unbounded text-BBprimary1">
            {volumeInfo.authors}
          </p>
        </div>
      </div>
    </Link>
  )
}

export default SideNavCurrentlyReading
