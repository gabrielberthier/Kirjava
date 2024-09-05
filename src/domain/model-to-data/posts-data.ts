import type { IAllPostResponse, IPostResponse } from '$domain/models/post'
import { headfy } from '$lib/dom/heading'
import { addTimezoneOffset } from '$services/utils/time'
import { siblingfy } from '$services/utils/data-sets-utilities'
import { format } from 'date-fns'
import readingTime from 'reading-time'
import { parse } from 'node-html-parser'
import type { Meta } from '$domain/models/meta'
import type { Entry, Post } from '../../schemas'

export const postConverter = (post: Post): IPostResponse => {
  const {
    html,
    excerpt,
    createdAt,
    tags: rawtags,
    feature_image,
    feature_image_caption,
    codeinjection_head,
    codeinjection_foot
  } = post

  const tags = rawtags ?? []

  const htmlPostElement = parse(html ?? '')

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
      text: excerpt ?? '',
      html
    },
    next: undefined,
    previous: undefined,
    readingTime: readingTime(post.html ?? '').text,
    headings: headfy(htmlPostElement),
    featureImage: feature_image,
    featureImageCaption: feature_image_caption,
    tags,
    codeinjectionFooter: codeinjection_foot,
    codeinjectionHead: codeinjection_head
  }
}

function classToInterface(meta: Meta): Meta {
  const { pagination } = meta
  let { next = undefined, prev = undefined } = pagination
  next ??= undefined
  prev ??= undefined
  return {
    pagination: {
      ...pagination,
      next: next,
      prev
    }
  }
}

export function allPostsConverter(entrypoint: Entry): IAllPostResponse {
  return {
    posts: entrypoint.posts.map((el) => postConverter(el)).map(siblingfy),
    meta: entrypoint.meta && classToInterface(entrypoint.meta)
  }
}
