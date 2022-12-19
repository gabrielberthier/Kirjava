import { o, union } from '../functions'

export const Author = o(
  [
    { json: 'id', js: 'id', typ: union(undefined, '') },
    { json: 'name', js: 'name', typ: union(undefined, '') },
    { json: 'slug', js: 'slug', typ: union(undefined, '') },
    { json: 'profile_image', js: 'profileImage', typ: union(undefined, '') },
    { json: 'cover_image', js: 'coverImage', typ: union(undefined, null) },
    { json: 'bio', js: 'bio', typ: union(undefined, '') },
    { json: 'website', js: 'website', typ: union(undefined, '') },
    { json: 'location', js: 'location', typ: union(undefined, null) },
    { json: 'facebook', js: 'facebook', typ: union(undefined, '') },
    { json: 'twitter', js: 'twitter', typ: union(undefined, '') },
    { json: 'meta_title', js: 'metaTitle', typ: union(undefined, null) },
    { json: 'meta_description', js: 'metaDescription', typ: union(undefined, null) },
    { json: 'url', js: 'url', typ: union(undefined, '') }
  ],
  false
)
