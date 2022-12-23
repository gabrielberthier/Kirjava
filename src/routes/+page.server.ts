import { GitHubApiService } from '$lib/data/github'
import { PostsLoader } from '$lib/data/posts'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async function load() {
  const { posts } = await new PostsLoader(false).all(1, 4)
  const {repositories} = await GitHubApiService.get('')
  return {
    posts,
    repositories
  }
}
