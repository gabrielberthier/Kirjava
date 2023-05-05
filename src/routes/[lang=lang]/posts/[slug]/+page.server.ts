import { error } from '@sveltejs/kit'
import { PostLoaderFactory } from '$services/posts/post-fetcher-factory'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async function load({ params, url }) {
  const { slug } = params

  const postsDataProvider = PostLoaderFactory.get()

  const resultPosts = await postsDataProvider.getOneBySlug(slug!)

  const post = resultPosts.unwrapOr(null)

  if (!post) {
    throw error(404, 'Post not found')
  }

  return {
    post
  }
}
