import type { Entry } from '$domain/adapters'
import type { IAllPostResponse, IPostResponse, Post } from '$domain/models/post'
import { headfy } from '$lib/dom/heading'
import { addTimezoneOffset, siblingfy } from '$services/utils/functions'
import { format } from 'date-fns'
import readingTime from 'reading-time'
import { parse } from 'node-html-parser'

export const postConverter = (post: Post): IPostResponse => {
  const { html, excerpt, createdAt } = post

  const htmlPostElement = parse(html || '')

  const newDate =
    createdAt &&
    format(
      // offset by timezone so that the date is correct
      addTimezoneOffset(createdAt),
      'yyyy-MM-dd'
    )

  return {
    ...post,
    createdAt: newDate,
    isIndexFile: false,
    preview: {
      text: excerpt,
      html
    },
    next: undefined,
    previous: undefined,
    readingTime: readingTime(post.html || '').text,
    headings: headfy(htmlPostElement)
  }
}

export function allPostsConverter(entrypoint: Entry): IAllPostResponse {
  return {
    posts: entrypoint.posts.map((el) => postConverter(el)).map(siblingfy),
    meta: entrypoint.meta?.classToInterface()
  }
}
