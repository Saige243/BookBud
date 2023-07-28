export type User = {
  currentUser: {
    _id: string
    email: string
    username: string
    createdAt: string
    updatedAt: string
    savedBooks: any[]
  }
}

export type Book = {
  id: string
  title: string
}
