export * from './author'
export * from './post'
export * from './tag'

export interface User {
  id: number
  username: string
  email: string
  provider: string
  confirmed: boolean
  blocked: boolean
  role: Role
  created_at: string
  updated_at: string
}

export interface Role {
  id: number
  name: string
  description: string
  type: string
}

export interface Author extends Omit<Omit<User, 'posts'>, 'role'> {
  role: Role['id']
}
