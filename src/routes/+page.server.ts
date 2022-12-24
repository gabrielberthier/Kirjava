import type { GitHubRepository } from '$domain/models/github/user-repositories'
import { GitHubApiService } from '$lib/data/github'
import { PostsLoader } from '$lib/data/posts'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async function load() {
  const [allPosts, repositories ] = await Promise.all([
    new PostsLoader(false).all(1, 4),
    GitHubApiService.get('', {sort: 'updated', per_page: 5})
  ])
  const { posts } = allPosts

  const r = repositories as unknown as GitHubRepository[]

  console.log(r);
  

  return {
    posts,
    // repositories: r
  }
}
