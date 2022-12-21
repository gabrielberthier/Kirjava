import { posts } from '$lib/data/posts'
import { error } from '@sveltejs/kit'
import type { Load } from '@sveltejs/kit'

export const load: Load = async function load({ params }) {
  const { slug } = params

  // get post with metadata
  const post = posts.find((post) => slug === post.slug)

  if (!post) {
    throw error(404, 'Post not found')
  }

  console.log('Retrieving posts')

  console.log(post)

  return {
    post
  }
}
