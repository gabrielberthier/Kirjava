import { o, union, arrayItem, r } from '../functions'

export const Entry = o(
  [{ json: 'posts', js: 'posts', typ: union(undefined, arrayItem(r('Post'))) }],
  false
)
