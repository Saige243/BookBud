import React from 'react'
import { useState, useEffect } from 'react'
import { GhostButton } from '../components/buttons/buttons'
import BookContainer from '../components/BookContainer'

function Dashboard({
  bookIds,
  selectedCategoryTerm,
  isLoading,
}: {
  bookIds: any
  selectedCategoryTerm: (category: string) => void
  isLoading: boolean
}) {
  const [selectedCategory, setSelectedCategory] = useState('Best Sellers')
  const [displayedBooks, setDisplayedBooks] = useState([])

  useEffect(() => {
    setDisplayedBooks(bookIds)
  }, [bookIds])

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

  const handleCategorySelection = (category: string) => {
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
          {!isLoading &&
            displayedBooks.map((book, i) => (
              <BookContainer props={book} key={i} />
            ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
