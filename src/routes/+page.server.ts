import { PostsLoader } from '$lib/data/posts'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async function load() {
  const p = new PostsLoader(false)
  return {
    posts: (await p.all(1, 4)).posts
  }
}
