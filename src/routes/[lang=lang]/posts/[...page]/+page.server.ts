import { redirect } from '@sveltejs/kit'
import type { IPostResponse } from '$domain/models/post'
import type { Meta } from '$domain/models/meta'
import { PostLoaderFactory } from '$services/posts/post-fetcher-factory'
import type { PageServerLoad } from './$types'

export interface LoadedPostResponse {
  posts: IPostResponse[]
  page: number
  limit: number
  meta?: Meta
}

export const load: PageServerLoad = async ({ params, url }) => {
  let page = 1
  let limit = 10

  const postsDataProvider = PostLoaderFactory.get()
  const extraParams: any = {}
  if (url.searchParams.get('tag')) {
    extraParams.filter = `tag:${url.searchParams.get('tag')}`
  }

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

  const { posts, meta } = (await postsDataProvider.all(page, limit, extraParams)).unwrapOr({
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
    meta
  }
}
