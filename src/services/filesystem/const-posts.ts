import { format } from 'date-fns'
import { parse } from 'node-html-parser'
import readingTime from 'reading-time'
import { addTimezoneOffset } from '$services/utils/time'
import { siblingfy } from '$services/utils/data-sets-utilities'
import type { SvelteComponent } from 'svelte'
import type { IPostResponse } from '$domain/models/post'

interface postFile {
  default: SvelteComponent
  metadata: Record<string, any>
}

export const posts: IPostResponse[] = Object.entries(
  import.meta.glob<postFile>('/posts/**/*.md', { eager: true })
)
  .map(([filepath, post]) => {
    const html = parse(post.default.render().html) || ''
    const preview = post.metadata.preview ? parse(post.metadata.preview) : html.querySelector('p')

    return {
      ...post.metadata,

      // generate the slug from the file path
      slug: filepath
        .replace(/(\/index)?\.md/, '')
        .split('/')
        .pop(),

      // whether or not this file is `my-post.md` or `my-post/index.md`
      // (needed to do correct dynamic import in posts/[slug].svelte)
      isIndexFile: filepath.endsWith('/index.md'),

      // format date as yyyy-MM-dd
      createdAt: post.metadata.date
        ? format(
            // offset by timezone so that the date is correct
            addTimezoneOffset(new Date(post.metadata.date)),
            'yyyy-MM-dd'
          )
        : undefined,

      preview: {
        html: preview?.toString(),
        // text-only preview (i.e no html elements), used for SEO
        text: preview?.structuredText ?? preview?.toString()
      },
      headings: [],
      // get estimated reading time for the post
      readingTime: readingTime(html.structuredText).text,
      tags: []
    }
  })
  // sort by date
  .sort(
    (a, b) =>
      new Date(b.createdAt || new Date()).getTime() - new Date(a.createdAt || new Date()).getTime()
  )
  // add references to the next/previous post
  .map(siblingfy)
