import React, { useState } from 'react'
import { PrimaryButton } from '../components/Buttons'
import useAuth from '../auth/useAuth'
import { useContext } from 'react'
import AuthContext from '../auth/AuthContext'

export default function Profile() {
  const { currentUser } = useContext(AuthContext)
  const [firstName, setFirstName] = useState(currentUser?.firstName)
  const [lastName, setLastName] = useState(currentUser?.lastName)
  const { editUserName } = useAuth()

  function handleSubmit(event: { preventDefault: () => void }) {
    event.preventDefault()
  }

  const handleNameChange = async () => {
    await editUserName(firstName, lastName)
  }

  return (
    <div className="flex justify-center items-center h-screen bg-BBwhite">
      <div className="relative bottom-28">
        <form
          onSubmit={handleSubmit}
          className="bg-BBwhite shadow-md rounded-2xl px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2 font-unbounded"
              htmlFor="firstName"
            >
              First Name:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 font-bold mb-2 font-unbounded"
              htmlFor="lastName"
            >
              Last Name:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
              id="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-center">
            <PrimaryButton
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              text="Submit"
              onClick={handleNameChange}
            />
          </div>
        </form>
      </div>
    </div>
  )
}
