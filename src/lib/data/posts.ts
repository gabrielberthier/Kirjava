import type { IPostResponse } from '$models/post'
import { FileSystemPostsLoader } from '$services/filesystem/posts-loader'
import { env } from '$env/dynamic/private'
import { allPostsConverter } from '$domain/model-to-data/posts-data'
import { AllPostsApi } from '$services/api/posts-api'

// Use a loader factory here to cases 1 - From local .md files and Ghost CMS

const loadURL = async () => {
  return await AllPostsApi.get('', {})
}

const from = async () =>
  env.USE_LOCAL ? new FileSystemPostsLoader().load() : allPostsConverter(await loadURL())

// Get all posts and add metadata
export const posts: IPostResponse[] = await from()
