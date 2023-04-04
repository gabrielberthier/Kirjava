import { GithubDataProvider } from '$lib/data/github'
import { PostLoaderFactory } from '$services/posts/post-fetcher-factory'
import type { PageServerLoad } from './$types'
import { github } from '$lib/info'
import { env as private_env } from '$env/dynamic/private'
import { env as public_env } from '$env/dynamic/public'
import { GitHubApi } from '$services/api/github-api'
import type { IPostResponse } from '$domain/models/post'
import type { PojoHttpException } from '$services/http/exceptions/http-exceptions'

export const load: PageServerLoad = async function load() {
  const postsDataProvider = PostLoaderFactory.get()
  const githuhDataProvider = new GithubDataProvider(
    new GitHubApi(private_env.GITHUB_KEY ?? '', public_env.PUBLIC_GITHUB_URL ?? '', github)
  )

  const [allPosts, ] = await Promise.all([
    postsDataProvider.all(1, 4),
    githuhDataProvider.gatherRepositories()
  ])

  let posts: IPostResponse[] = []
  let postError: PojoHttpException|null = null

  if(allPosts.isErr()){
    postError = allPosts.error.toPojo()
    console.error(postError);
    
  }
  else{
    posts = allPosts.value.posts
  }
  
  return {
    posts,
    postError,
    repositories: []
  }
}
