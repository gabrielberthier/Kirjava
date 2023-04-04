import { PostsDataProvider } from '$lib/data/posts/posts'
import { error } from '@sveltejs/kit'
import type { Load } from '@sveltejs/kit'
import { PostFetcherFactory } from '$services/posts/post-fetcher-factory'

export const load: Load = async function load({ params }) {
  const { slug } = params

  // get post with metadata
  const postLoader = new PostsDataProvider(PostFetcherFactory.getPostFetcher())

  const post = (await postLoader.getOneBySlug(slug!)).unwrapOr(null)

  if (!post) {
    throw error(404, 'Post not found')
  }

  return {
    post
  }
}
