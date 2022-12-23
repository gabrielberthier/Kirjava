import { MetaClass } from './meta'
import type { Post } from './post'

export class Entry {
  posts: Post[] = []
  meta?: MetaClass = new MetaClass()
}
