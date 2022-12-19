import { o, union, arrayItem, r } from '../functions'

export const Post = o(
  [
    { json: 'slug', js: 'slug', typ: union(undefined, '') },
    { json: 'id', js: 'id', typ: union(undefined, '') },
    { json: 'uuid', js: 'uuid', typ: union(undefined, '') },
    { json: 'title', js: 'title', typ: union(undefined, '') },
    { json: 'html', js: 'html', typ: union(undefined, '') },
    { json: 'comment_id', js: 'commentID', typ: union(undefined, '') },
    { json: 'feature_image', js: 'featureImage', typ: union(undefined, '') },
    { json: 'feature_image_alt', js: 'featureImageAlt', typ: union(undefined, null) },
    { json: 'feature_image_caption', js: 'featureImageCaption', typ: union(undefined, null) },
    { json: 'featured', js: 'featured', typ: union(undefined, true) },
    { json: 'meta_title', js: 'metaTitle', typ: union(undefined, null) },
    { json: 'meta_description', js: 'metaDescription', typ: union(undefined, null) },
    { json: 'created_at', js: 'createdAt', typ: union(undefined, Date) },
    { json: 'updated_at', js: 'updatedAt', typ: union(undefined, Date) },
    { json: 'published_at', js: 'publishedAt', typ: union(undefined, Date) },
    { json: 'custom_excerpt', js: 'customExcerpt', typ: union(undefined, '') },
    { json: 'codeinjection_head', js: 'codeinjectionHead', typ: union(undefined, null) },
    { json: 'codeinjection_foot', js: 'codeinjectionFoot', typ: union(undefined, null) },
    { json: 'og_image', js: 'ogImage', typ: union(undefined, null) },
    { json: 'og_title', js: 'ogTitle', typ: union(undefined, null) },
    { json: 'og_description', js: 'ogDescription', typ: union(undefined, null) },
    { json: 'twitter_image', js: 'twitterImage', typ: union(undefined, null) },
    { json: 'twitter_title', js: 'twitterTitle', typ: union(undefined, null) },
    { json: 'twitter_description', js: 'twitterDescription', typ: union(undefined, null) },
    { json: 'custom_template', js: 'customTemplate', typ: union(undefined, null) },
    { json: 'canonical_url', js: 'canonicalURL', typ: union(undefined, null) },
    { json: 'authors', js: 'authors', typ: union(undefined, arrayItem(r('Author'))) },
    { json: 'tags', js: 'tags', typ: union(undefined, arrayItem(r('Tag'))) },
    { json: 'primary_author', js: 'primaryAuthor', typ: union(undefined, r('Author')) },
    { json: 'primary_tag', js: 'primaryTag', typ: union(undefined, r('Tag')) },
    { json: 'url', js: 'url', typ: union(undefined, '') },
    { json: 'excerpt', js: 'excerpt', typ: union(undefined, '') }
  ],
  false
)
