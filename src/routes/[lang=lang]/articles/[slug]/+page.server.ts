import { PostLoaderFactory } from '$services/posts/post-fetcher-factory'
import { error } from '@sveltejs/kit'
import type { Load } from '@sveltejs/kit'

export const load: Load = async function load({ params }) {
  const { slug } = params

  const postsDataProvider = PostLoaderFactory.get()

  const resultPosts = await postsDataProvider.getOneBySlug(slug!, { filter: 'tag:article' })

  const post = resultPosts.unwrapOr(null)

  if (!post) {
    throw error(404, 'Post not found')
  }

  return {
    post
  }
}
