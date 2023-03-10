import { redirect } from '@sveltejs/kit'
import type { ServerLoadEvent } from '@sveltejs/kit'
import { PostsLoader } from '$lib/data/posts'
import type { IPostResponse } from '$domain/models/post'
import { env } from '$env/dynamic/public'
import type { Meta } from '$domain/models/meta'

export interface LoadedPostResponse {
  posts: IPostResponse[]
  page: number
  limit: number
  meta?: Meta
}

export async function load(event: ServerLoadEvent): Promise<LoadedPostResponse> {
  const { params } = event
  let page = 1
  let limit = 10

  const useLocal = !!env.PUBLIC_USE_LOCAL

  const postsLoader = new PostsLoader(useLocal)

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

  const { posts, meta } = await postsLoader.all(page, limit)  

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
