import type { Entry } from '$domain/adapters'
import type { IPostResponse, Post } from '$domain/models/post'
import { siblingfy } from '$services/utils/functions'

export const postConverter =  (post: Post): IPostResponse => {
  const { html, excerpt, createdAt } = post

  const newDate = createdAt && new Date(createdAt)

  return {
    ...post,
    createdAt: newDate?.toDateString(),
    isIndexFile: false,
    preview: {
      text: excerpt,
      html
    },
    next: undefined,
    previous: undefined
  }
}

export function allPostsConverter(entrypoint: Entry): IPostResponse[]  {
  return entrypoint.posts.map(el => postConverter(el)).map(siblingfy)
}
