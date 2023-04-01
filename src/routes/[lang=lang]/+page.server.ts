import { GithubDataProvider } from '$lib/data/github'
import { PostsDataProvider } from '$lib/data/posts'
import { PostFetcherFactory } from '$services/posts/post-fetcher-factory'
import type { PageServerLoad } from './$types'
import { github } from '$lib/info'
import { env as private_env } from '$env/dynamic/private'
import { env as public_env } from '$env/dynamic/public'
import { GitHubApi } from '$services/api/github-api'

export const load: PageServerLoad = async function load() {
  const postsDataProvider = new PostsDataProvider(PostFetcherFactory.getPostFetcher())
  const githuhDataProvider = new GithubDataProvider(
    new GitHubApi(private_env.GITHUB_KEY ?? '', public_env.PUBLIC_GITHUB_URL ?? '', github)
  )

  const [allPosts, repositories] = await Promise.all([
    postsDataProvider.all(1, 4),
    githuhDataProvider.gatherRepositories()
  ])
  
  const { posts } = allPosts

  return {
    posts,
    repositories
  }
}
