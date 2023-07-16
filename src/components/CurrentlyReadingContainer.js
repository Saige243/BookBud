import { Link } from 'react-router-dom'

const CurrentlyReadingContainer = ({ props }) => {
  const { volumeInfo } = props

  const truncatedTitle =
    volumeInfo.title.length > 25
      ? `${volumeInfo.title.slice(0, 40)}...`
      : volumeInfo.title

  return (
    <Link to={`/books/${props.id}`}>
      <div className="h-40 w-96 book-container rounded-[20px] shadow-xl flex  mx-2 mt-3 mb-16 hover:opacity-80">
        <img
          src={volumeInfo.imageLinks.thumbnail}
          alt={volumeInfo.title}
          className="h-full rounded-l-[20px] object-cover"
        />
        <div className="pl-4 pt-2">
          <h3 className="text-lg font-unbounded">{truncatedTitle}</h3>
          <p className="text-sm font-unbounded">{volumeInfo.authors}</p>
        </div>
      </div>
    </Link>
  )
}

export default CurrentlyReadingContainer
