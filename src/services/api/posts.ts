import { PostsEntryAdapter } from 'src/domain/adapters'
import type { Entry } from 'src/domain/adapters'
import { readerServiceFactory } from '../http/factory/make-service'

export const postsApi = readerServiceFactory<Entry>('posts', new PostsEntryAdapter())
