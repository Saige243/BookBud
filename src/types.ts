export type User = {
  _id: string
  email: string
  username: string
  createdAt: string
  updatedAt: string
  savedBooks: any[]
} | null

export type AuthContextValue = {
  currentUser: User | null
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>
} | null

export type Book = {
  id: string
  title: string
}
