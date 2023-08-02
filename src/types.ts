export type User = {
  _id: string
  email: string
  username: string
  createdAt: string
  updatedAt: string
  savedBooks: any[]
  currentlyReading: any[]
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
}
