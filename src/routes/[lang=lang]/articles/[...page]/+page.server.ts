import { redirect } from '@sveltejs/kit'
import type { ServerLoadEvent } from '@sveltejs/kit'
import type { IPostResponse } from '$domain/models/post'
import type { Meta } from '$domain/models/meta'
import { PostLoaderFactory } from '$services/posts/post-fetcher-factory'
import { multiTagsApi } from '$services/api/tags-api'
import type { Tag } from '../../../../schemas'

export interface LoadedPostResponse {
  posts: IPostResponse[]
  page: number
  limit: number
  meta?: Meta
  tags: Tag[]
}

export async function load(event: ServerLoadEvent): Promise<LoadedPostResponse> {
  const { params } = event
  let page = 1
  let limit = 10

  const postsDataProvider = PostLoaderFactory.get()

  const tags = await multiTagsApi.get('tags')

  if (params.page) {
    try {
      // a url of /posts/page/2 will come through as 'page/2' for params.page
      const index = params.page.split('page/').pop()

      if (index) {
        page = parseInt(index)
      }
    } catch (e) {
      console.error(e)
    }
  }

  const articlesResult = await postsDataProvider.getArticles(page, limit)

  const { posts, meta } = articlesResult.unwrapOr({
    posts: [],
    meta: undefined
  })

  // if page doesn't exist, direct to page 1
  if (posts.length === 0 && page > 1) {
    throw redirect(302, '/posts')
  }

  return {
    posts,
    page,
    limit,
    meta,
    tags: tags.data?.tags!
  }
}
