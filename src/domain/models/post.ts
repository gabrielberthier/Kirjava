import type { Tag } from './tag'
import type { Author } from './author'

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
}

export interface Post {
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
  createdAt?: Date
  updatedAt?: Date
  publishedAt?: Date
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
  primaryAuthor?: Author|null
  primaryTag?: Tag|null
  url?: string
  excerpt?: string
}
