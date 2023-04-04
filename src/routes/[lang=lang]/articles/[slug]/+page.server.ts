import { PostLoaderFactory } from '$services/posts/post-fetcher-factory'
import { error } from '@sveltejs/kit'
import type { Load } from '@sveltejs/kit'

export const load: Load = async function load({ params }) {
  const { slug } = params

  try {
    const postsDataProvider = PostLoaderFactory.get()

    const post = await (await postsDataProvider.getOneBySlug(slug!, { filter: 'tag:article' })).unwrapOr(null)

    if (!post) {
      throw error(404, 'Post not found')
    }

    return {
      post
    }
  } catch (error) {
    console.error(error)
    
    return {
      post: undefined
    }
  }
}
