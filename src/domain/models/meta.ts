import { Type } from "class-transformer"

export interface Pagination {
  page: number
  limit: number
  pages: number
  total: number
  next?: number
  prev?: number
}

export interface Meta {
  pagination: Pagination
}

export class PaginationClass {
  page: number = 1
  limit: number = 4
  pages: number = 4
  total: number = 15
  next?: number | null = null
  prev?: number | null = null
}

export class MetaClass {
  pagination = new PaginationClass()
}
