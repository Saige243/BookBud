import { SetStateAction } from 'react'

export type User = {
  _id: string
  email: string
  username: string
  createdAt: string
  updatedAt: string
  savedBooks: SetStateAction<never[]> | any
  currentlyReading: SetStateAction<never[]> | any
  finishedBooks: SetStateAction<never[]> | any
  firstName: string
  lastName: string
} | null

export type AuthContextValue = {
  currentUser: User | null
  setCurrentUser: React.Dispatch<React.SetStateAction<User>>
}

export type Book = {
  id: string
  title: string
  authors: string[]
  description: string
  imageLinks: {
    thumbnail: string
  }
  averageRating: number
}

export type BookContainerProps = {
  id: string
  volumeInfo: Book
}

export type SavedBooksArray = {
  savedBooks: Book[]
}

export type SavedBook = { bookId: string }
