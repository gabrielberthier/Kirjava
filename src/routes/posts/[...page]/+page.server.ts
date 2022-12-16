import { redirect } from '@sveltejs/kit'
import type { ServerLoadEvent } from '@sveltejs/kit'
import { posts } from '$lib/data/posts'
import type { IPostResponse  } from '$lib/data/posts'
import { paginate } from '$lib/util'

export interface LoadedPostResponse{
  posts: IPostResponse[],
  page: number,
  limit: number
}

export async function load(event: ServerLoadEvent): Promise<LoadedPostResponse> {
  const { params } = event
  let page = 1
  let limit = 10

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

  const postsForPage = paginate(posts, { limit, page })

  // if page doesn't exist, direct to page 1
  if (postsForPage.length == 0 && page > 1) {
    throw redirect(302, '/posts')
  }

  return {
    posts: postsForPage,
    page,
    limit
  }
}
