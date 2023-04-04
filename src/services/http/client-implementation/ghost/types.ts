import type {
  Author,
  Authors,
  Nullable,
  PostOrPage,
  PostsOrPages,
  Tag,
  Tags
} from '@tryghost/content-api'

export type EntitiesTypes = 'posts' | 'authors' | 'tags' | 'pages'

export interface Pagination {
  page: number
  limit: number
  pages: number
  total: number
  next: Nullable<number>
  prev: Nullable<number>
}

export interface Meta {
  pagination: Pagination
}

export type GhostResponse = {
  [index in EntitiesTypes]?: PostOrPage | Author | Tag | PostsOrPages | Authors
} & { meta?: Meta }
