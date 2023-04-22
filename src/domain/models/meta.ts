export interface Pagination {
  page: number
  limit: number
  pages: number
  total: number
  next?: number | null
  prev?: number | null
}

export interface Meta {
  pagination: Pagination
}