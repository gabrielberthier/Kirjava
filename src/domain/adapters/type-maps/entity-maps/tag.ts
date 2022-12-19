import { o, union } from '../functions'

export const Tag = o(
  [
    { json: 'id', js: 'id', typ: union(undefined, '') },
    { json: 'name', js: 'name', typ: union(undefined, '') },
    { json: 'slug', js: 'slug', typ: union(undefined, '') },
    { json: 'description', js: 'description', typ: union(undefined, null) },
    { json: 'feature_image', js: 'featureImage', typ: union(undefined, null) },
    { json: 'visibility', js: 'visibility', typ: union(undefined, '') },
    { json: 'meta_title', js: 'metaTitle', typ: union(undefined, null) },
    { json: 'meta_description', js: 'metaDescription', typ: union(undefined, null) },
    { json: 'url', js: 'url', typ: union(undefined, '') }
  ],
  false
)
