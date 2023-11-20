export type User = {
  _id: string
  email: string
  username: string
  createdAt: string
  updatedAt: string
  savedBooks: any[]
  currentlyReading: any[]
  finishedBooks: any[]
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

export type SavedBook = { bookId: { bookId: string } }
