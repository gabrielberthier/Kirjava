import { gatherRepositories } from '$lib/data/github'
import { PostsLoader } from '$lib/data/posts'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async function load() {
  const [allPosts, repositories] = await Promise.all([
    new PostsLoader(false).all(1, 4),
    gatherRepositories()
  ])
  const { posts } = allPosts

  return {
    posts,
    repositories
  }
}
