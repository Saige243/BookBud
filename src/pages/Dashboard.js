import { useState, useEffect, useContext } from 'react'
import AuthContext from '../auth/AuthContext'
import { GhostButton, PrimaryButton } from '../components/buttons/buttons'
import BookContainer from '../components/BookContainer'

function Dashboard({ books, selectedCategoryTerm }) {
  const { currentUser } = useContext(AuthContext)
  const [selectedCategory, setSelectedCategory] = useState('Best Sellers')
  const [displayedBooks, setDisplayedBooks] = useState([])

  useEffect(() => {
    setDisplayedBooks(books)
  }, [books])

  const categories = [
    'Best Sellers',
    'Popular',
    'Classics',
    'Mystery',
    'Romance',
    'Crime',
    'Thriller',
    'Humor',
  ]

  const selectedCategoryStyles =
    'bg-BBgreen text-BBprimary1 p-2 text-BBwhite border-none'

  const handleCategorySelection = (category) => {
    setSelectedCategory(category)
    selectedCategoryTerm(category)
  }

  return (
    <div className="px-6 bg-BBwhite min-h-screen">
      <div className="flex justify-between p-2">
        {categories.map((category, i) => (
          <GhostButton
            text={category}
            key={i}
            className={
              category === selectedCategory
                ? selectedCategoryStyles
                : 'bg-transparent text-BBprimary1 p-2 border-none'
            }
            onClick={() => handleCategorySelection(category)}
          />
        ))}
      </div>
      <div className="bg-BBwhite min-h-screen">
        <div className="flex flex-row flex-wrap justify-evenly">
          {displayedBooks.map((book, i) => (
            <BookContainer props={book} key={i} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
