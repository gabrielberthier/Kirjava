import { PostLoaderFactory } from '$services/posts/post-fetcher-factory'
import type { PageServerLoad } from './$types'
import type { IPostResponse } from '$domain/models/post'
import type { PojoHttpException } from '$services/http/exceptions/http-exceptions'

export const load: PageServerLoad = async function load({setHeaders}) {
  const postsDataProvider = PostLoaderFactory.get()
  const allPosts = await postsDataProvider.all(1, 4)

  let posts: IPostResponse[] = []
  let postError: PojoHttpException | null = null

  if (allPosts.isErr()) {
    postError = allPosts.error.toPojo()
    console.error(postError)
  } else {
    setHeaders({
      'cache-control': `max-age=${1200}`
    })
    posts = allPosts.value.posts
  }

  return {
    posts,
    postError
  }
}
