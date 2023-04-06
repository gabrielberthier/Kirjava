import { error } from '@sveltejs/kit'
import type { Load } from '@sveltejs/kit'
import { PostLoaderFactory } from '$services/posts/post-fetcher-factory'

export const load: Load = async function load({ params }) {
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
