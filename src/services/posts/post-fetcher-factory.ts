import { ApiPostsLoader } from '$services/api/posts-api'
import { FileSystemPostsLoader } from '$services/filesystem/posts-loader'
import { PUBLIC_USE_LOCAL } from '$env/static/public'
import { PostsDataProvider } from '$lib/data/posts/posts'

export class PostLoaderFactory {
  static get(): PostsDataProvider {
    const useLocal = Boolean(PUBLIC_USE_LOCAL)
    if (useLocal) {
      return new PostsDataProvider(new FileSystemPostsLoader());
    }

    return new PostsDataProvider(new ApiPostsLoader())
  }
}
