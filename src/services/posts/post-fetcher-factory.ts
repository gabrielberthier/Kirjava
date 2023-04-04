import { ApiPostsLoader } from '$services/api/posts-api'
import { FileSystemPostsLoader } from '$services/filesystem/posts-loader'
import { env } from '$env/dynamic/private'
import { PostsDataProvider } from '$lib/data/posts/posts'

export class PostLoaderFactory {
  static get(): PostsDataProvider {
    const useLocal = Boolean(env.USE_LOCAL)
    const loader = useLocal ? new FileSystemPostsLoader() : new ApiPostsLoader()

    return new PostsDataProvider(loader)
  }
}
