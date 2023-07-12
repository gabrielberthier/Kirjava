import type { Meta } from './meta'
import type { Tag } from './tag'

interface Heading {
  value: string
  depth: number
  id: string
}

export interface IAllPostResponse {
  posts: IPostResponse[]
  meta?: Meta
}

export interface IPostResponse {
  id?: string
  next?: IPostResponse
  previous?: IPostResponse
  slug?: string
  uuid?: string
  title?: string
  commentId?: string
  isIndexFile: boolean
  createdAt?: string
  featureImage?: string | null
  featureImageCaption?: string | null
  preview: {
    html?: string
    text?: string
  }
  readingTime: string
  headings: Heading[]
  tags: Tag[]
  codeinjectionHead?: string | null
  codeinjectionFooter?: string | null
}
