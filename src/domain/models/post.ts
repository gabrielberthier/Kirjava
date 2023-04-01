import type { Tag } from './tag'
import type { Author } from './author'
import type { Meta } from './meta'

interface Heading {
  value: string
  depth: number
  id: string
}

type PostResponseSet = {
  posts: IPostResponse[]
  meta: Meta
}

export type IAllPostResponse = Partial<PostResponseSet>

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
  preview: {
    html?: string
    text?: string
  }
  readingTime: string
  headings: Heading[]
}

export class Post {
  slug?: string
  id?: string
  uuid?: string
  title?: string
  html?: string
  commentID?: string
  featureImage?: string
  featureImageAlt?: string | null
  featureImageCaption?: string | null
  featured?: boolean
  metaTitle?: string | null
  metaDescription?: string | null
  createdAt?: string
  updatedAt?: string
  publishedAt?: string
  customExcerpt?: string
  codeinjectionHead?: string | null
  codeinjectionFoot?: string | null
  ogImage?: string | null
  ogTitle?: string | null
  ogDescription?: string | null
  twitterImage?: string | null
  twitterTitle?: string | null
  twitterDescription?: string | null
  customTemplate?: string | null
  canonicalURL?: string | null
  authors?: Author[]
  tags?: Tag[]
  primaryAuthor?: Author | null
  primaryTag?: Tag | null
  url?: string
  excerpt?: string
}
