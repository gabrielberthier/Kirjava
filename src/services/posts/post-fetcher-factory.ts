import { ApiPostsLoader } from '$services/api/posts-api'
import { FileSystemPostsLoader } from '$services/filesystem/posts-loader'

export class PostFetcherFactory {
  static getPostFetcher(useLocal: boolean = false) {
    return useLocal ? new FileSystemPostsLoader() : new ApiPostsLoader()
  }
}
