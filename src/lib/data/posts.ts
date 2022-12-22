import type { IAllPostResponse } from '$models/post'
import { FileSystemPostsLoader } from '$services/filesystem/posts-loader'
import { allPostsConverter } from '$domain/model-to-data/posts-data'
import { AllPostsApi } from '$services/api/posts-api'

// Use a loader factory here to cases 1 - From local .md files and Ghost CMS

const loadURL = async (page?: number, limit?: number) => {
  return await AllPostsApi.get('', { page, limit })
}

export class PostsLoader {
  constructor(private useLocal: boolean) {}

  async all(page?: number, limit?: number): Promise<IAllPostResponse> {
    if (this.useLocal) {
      return new FileSystemPostsLoader().load({
        page,
        limit
      })
    }

    return allPostsConverter(await loadURL(page, limit))
  }
}
