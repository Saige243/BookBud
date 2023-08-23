import React from 'react'
import { useNavigate } from 'react-router-dom'
import magnifyingGlass from '../assets/images/icons/magnifyingGlass.svg'

function Navbar({ onSubmitSearch }) {
  const navigate = useNavigate()

  const submitSearchTerm = (searchTerm) => {
    onSubmitSearch(searchTerm)
    navigate('/searchResults')
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      submitSearchTerm(event.target.value)
    }
  }

  return (
    <div className="bg-BBwhite flex items-center justify-end py-2">
      <div className="relative w-full sm:w-1/2 lg:w-2/4 pr-4">
        <input
          type="text"
          placeholder="Search for a title or author"
          onSubmit={submitSearchTerm}
          onKeyDown={handleKeyPress}
          autoComplete="off"
          className="w-full bg-transparent p-3 pl-10 shadow-inner shadow-grey rounded-full focus:outline-none placeholder-BBprimary1 focus:border-BBblue border-2"
        />
        <img
          src={magnifyingGlass}
          alt="Search"
          className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 pointer-events-none "
        />
      </div>
    </div>
  )
}

export default Navbar
