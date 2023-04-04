// This is an endpoint that generates a basic rss feed for your posts.
// It is OK to delete this file if you don't want an RSS feed.
// credit: https://scottspence.com/posts/make-an-rss-feed-with-sveltekit#add-posts-for-the-rss-feed

import { name, website } from '$lib/info'
import { PostLoaderFactory } from '$services/posts/post-fetcher-factory'
import type { RequestHandler } from '@sveltejs/kit'

export const prerender = true

// update this to something more appropriate for your website
const websiteDescription = `${name}'s blog`
const postsUrl = `${website}/posts`
const createdAt = (createdAt?: string) =>
  (createdAt ? new Date(createdAt) : new Date()).toUTCString()

export const GET: RequestHandler = async ({ setHeaders }) => {
  setHeaders({
    'Cache-Control': `max-age=0, s-max-age=600`,
    'Content-Type': 'application/xml'
  })
  const postsDataProvider = PostLoaderFactory.get()
  const { posts } = (await postsDataProvider.getArticles()).unwrapOr({
    posts: [],
    meta: undefined
  })

  const xml = `<rss xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
      <channel>
        <title>${name}</title>
        <link>${website}</link>
        <description>${websiteDescription}</description>
        <atom:link href="${website}/rss.xml" rel="self" type="application/rss+xml" />
        ${posts
          .map(
            (post) =>
              `
              <item>
                <guid>${postsUrl}/${post.slug}</guid>
                <title>${post.title}</title>
                <description>${post.preview.text}</description>
                <link>${postsUrl}/${post.slug}</link>
                <pubDate>${createdAt(post.createdAt)}</pubDate>
            </item>
          `
          )
          .join('')}
      </channel>
    </rss>`

  return new Response(xml)
}
