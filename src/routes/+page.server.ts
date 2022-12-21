import { posts } from '$lib/data/posts'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async function load() {
  return {
    posts: posts.slice(0, 5)
  }
}
