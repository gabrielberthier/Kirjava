<script lang="ts">
  import { website, name } from '$lib/info'
  import { goto } from '$app/navigation'
  import { onMount } from 'svelte'
  import type { IPostResponse } from '$domain/models/post'
  import { page } from '$app/stores'
  import Disqus from '$components/Disqus/index.svelte'
  import PostHeader from './PostHeader.svelte'
  import PostImageFeature from './PostImageFeature.svelte'
  import FlexPostTags from './FlexPostTags.svelte'
  import PostAuthorContainer from './PostAuthorContainer.svelte'
  import PostToc from './PostToc.svelte'
  import PostRender from './PostRender.svelte'
  import { browser } from '$app/environment'
  import ReturnButton from '../Buttons/ReturnButton.svelte'

  export let post: IPostResponse
  export let component: any

  let hasChanged = false

  onMount(() => {
    if (browser) {
      if (post.codeinjectionHead) {
        const parser = new DOMParser()
        const el = parser.parseFromString(post.codeinjectionHead, 'text/html')
        const childrenToAdd: Element[] = [...el.head.children, ...el.body.children]

        childrenToAdd.forEach((el) => {
          document.head.insertAdjacentElement('beforeend', el)
        })
      }
      
      page.subscribe(({ url, data }) => {
        if (url.search && !hasChanged) {
          const locale = data?.internationalization?.lang || ''
          hasChanged = true
          goto(`/${locale}/posts${url.search}`)
        }
      })
    }
  })

  // generated open-graph image for sharing on social media.
  // see https://og-image.vercel.app/ for more options.
  const ogImage = `https://og-image.vercel.app/**${encodeURIComponent(
    post.title || ''
  )}**?theme=light&md=1&fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fhyper-color-logo.svg`

  const url = `${website}/${post.slug}`
</script>

<svelte:head>
  <title>{post.title} - {name}</title>
  <meta name="description" content={post.preview.text} />
  <meta name="author" content={name} />

  <!-- Facebook Meta Tags -->
  <meta property="og:url" content={url} />
  <meta property="og:type" content="website" />
  <meta property="og:title" content={post.title} />
  <meta property="og:description" content={post.preview.text} />
  <meta property="og:image" content={ogImage} />

  <!-- Twitter Meta Tags -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta property="twitter:domain" content={website} />
  <meta property="twitter:url" content={url} />
  <meta name="twitter:title" content={post.title} />
  <meta name="twitter:description" content={post.preview.text} />
  <meta name="twitter:image" content={ogImage} />
</svelte:head>

<div class="root">
  <ReturnButton />
  <div class="w-full mx-auto overflow-x-hidden">
    <article class="is-post-page">
      <!-- Shows Post Header {datetime, title, reading time} -->
      <PostHeader {post} />
      <!-- Lists Post Tags -->
      <FlexPostTags tags={post.tags} />
      <!-- Renders fig caption if exists -->
      <PostImageFeature {post} />
      <!-- Renders the post -->
      <PostRender {component} html={post.preview.html} />
    </article>

    <!-- bio -->
    <hr />

    <PostAuthorContainer />
  </div>

  <!-- table of contents -->
  <PostToc headings={post.headings} />
</div>

<hr />

<div class="">
  <div class="mx-auto overflow-x-hidden">
    <Disqus identifier={post.slug || ''} />
  </div>
</div>

<style lang="postcss">
  .root {
    display: grid;
    grid-template-columns: 1fr;
  }

  @media screen(lg) {
    .root {
      /* 42rem matches max-w-2xl */
      grid-template-columns:
        1fr
        min(65ch, 100%)
        1fr;
    }
  }
</style>
