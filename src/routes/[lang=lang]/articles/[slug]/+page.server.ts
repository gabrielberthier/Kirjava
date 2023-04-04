import { PostsLoader } from '$lib/data/posts/posts'
import { error } from '@sveltejs/kit'
import type { Load } from '@sveltejs/kit'

export const load: Load = async function load({ params }) {
  const { slug } = params

  try {
    const postLoader = new PostsLoader()

    const post = await postLoader.getOneBySlug(slug!, { filter: 'tag:article' })

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
