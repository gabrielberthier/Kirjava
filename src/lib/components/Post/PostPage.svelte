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

  page.subscribe(async ({ url, data }) => {
    if (url.search && !hasChanged) {
      const locale = data?.internationalization?.lang || ''
      hasChanged = true
      goto(`/${locale}/posts${url.search}`)
    }
  })

  onMount(() => {
    if (post.codeinjectionHead && browser) {
      const parser = new DOMParser()
      const el = parser.parseFromString(post.codeinjectionHead, 'text/html')
      const childrenToAdd = [...el.head.children, ...el.body.children]
      childrenToAdd.forEach((el) => {
        document.head.insertAdjacentElement('beforeend', el)
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
    <article>
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
      grid-template-columns: 1fr 45rem 1fr;
    }
  }

  :root {
    --google-blue-700: 25, 103, 210;
    --google-brown-900: 62, 39, 35;
    --google-purple-700: 132, 48, 206;
    --google-yellow-50: 254, 247, 224;
    --google-yellow-100: 254, 239, 195;
  }
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }
  blockquote,
  body,
  caption,
  dd,
  dl,
  fieldset,
  figure,
  form,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  hr,
  legend,
  ol,
  p,
  pre,
  ul,
  table,
  td,
  th {
    margin: 0;
    padding: 0;
    word-wrap: break-word;
  }
  sub,
  sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
  }
  sup {
    top: -0.5em;
  }
  sub {
    bottom: -0.25em;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
    display: block;
    overflow-x: auto;
  }
  td,
  th {
    padding: 0.5rem;
  }
  html {
    font-size: 14px;
  }
  body {
    -webkit-overflow-scrolling: touch;
    display: flex;
    flex-direction: column;
    line-height: 1.714;
    margin: 0 auto;
    min-height: 100vh;
    overflow-x: hidden;
    text-rendering: optimizeLegibility;
    transition-duration: 500ms;
    transition-property: color, background-color;
    transition-timing-function: ease;
  }
  .light {
    background-color: #fafafa;
    color: #424242;
  }
  .dark {
    background-color: #212121;
    color: #e0e0e0;
  }
  .sepia {
    background-color: rgb(var(--google-yellow-50));
    color: rgb(var(--google-brown-900));
  }
  .light a:link {
    color: rgb(85, 85, 255);
  }
  .sepia a:link {
    color: rgb(var(--google-blue-700));
  }
  .dark a:link {
    color: rgb(136, 136, 255);
  }
  .light a:visited {
    color: rgb(144, 34, 144);
  }
  .sepia a:visited {
    color: rgb(var(--google-purple-700));
  }
  .dark a:visited {
    color: rgb(216, 114, 216);
  }
  .light code,
  .light pre {
    background-color: #eee;
    border-color: #aaa;
  }
  .sepia code,
  .sepia pre {
    background-color: rgb(var(--google-yellow-100));
    border-color: rgba(var(--google-brown-900), 0.5);
  }
  .dark code,
  .dark pre {
    background-color: #333;
    border-color: #555;
  }
  .light tbody tr:nth-child(odd) {
    background-color: #eee;
  }
  .light th,
  .light td {
    border-left: 1px solid #aaa;
  }
  .sepia tbody tr:nth-child(odd) {
    background-color: rgb(217, 196, 175);
  }
  .sepia th,
  .sepia td {
    border-left: 1px solid rgb(147, 125, 102);
  }
  .dark tbody tr:nth-child(odd) {
    background-color: #333;
  }
  .dark th,
  .dark td {
    border-left: 1px solid #555;
  }
  #content-wrap th:first-child {
    border-left: none;
  }
  #content-wrap td:first-child {
    border-left: none;
  }
  .serif {
    font-family: serif;
  }
  .sans-serif {
    font-family: 'Roboto', sans-serif;
  }
  .monospace {
    font-family: monospace;
  }
  blockquote,
  caption,
  code,
  dd,
  dl,
  fieldset,
  figure,
  form,
  hr,
  legend,
  ol,
  p,
  pre,
  q,
  table,
  td,
  th,
  ul {
    margin-bottom: 1.143rem;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.417;
    margin: 1em 0;
  }
  #loading-indicator {
    padding-bottom: 2em;
    width: 100%;
  }
  #loading-indicator > img,
  #loading-indicator > svg {
    display: block;
    height: 2.5em;
    margin: auto;
    width: 2.5em;
  }
  video::-webkit-media-controls-fullscreen-button {
    display: none;
  }
  #content {
    margin: 24px 16px 24px 16px;
  }
  #main-content {
    flex: 1 1 auto;
    margin: 0 auto;
    max-width: 35em;
    width: 100%;
  }
  #article-header {
    margin-top: 24px;
    width: 100%;
  }
  #title-holder {
    font-size: 1.714rem;
    line-height: 1.417;
    margin: 0 16px;
  }
  blockquote {
    border-left: 4px solid #888;
    padding-left: 1em;
  }
  cite {
    font-style: italic;
    opacity: 0.8;
  }
  hr {
    border-style: solid;
    height: 1px 0 0 0;
    opacity: 0.5;
    width: 75%;
  }
  q {
    display: block;
    font-style: italic;
    font-weight: 600;
    opacity: 0.8;
  }
  embed,
  img,
  object,
  video {
    max-width: 100%;
  }
  img {
    display: block;
    height: auto;
    margin: 0.6rem auto 0.4rem auto;
  }
  embed + [class*='caption'],
  figcaption,
  img + [class*='caption'],
  object + [class*='caption'],
  video + [class*='caption'] {
    display: table;
    font-size: 0.857rem;
    line-height: 1.667;
    margin-bottom: 1rem;
    opacity: 0.8;
  }
  ol,
  ul {
    margin-left: 1.296rem;
  }
  code,
  pre {
    border: 1px solid;
    border-radius: 2px;
  }
  pre code {
    border: none;
  }
  pre {
    line-height: 1.642;
    padding: 0.5em;
    white-space: pre-wrap;
  }
  body .hidden {
    display: none;
  }
  .clear {
    clear: both;
  }
  .youtubeContainer {
    height: 0;
    padding-bottom: 56.25%;
    position: relative;
    width: 100%;
  }
  .youtubeIframe {
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
  }
  .desktop-only {
    display: none;
  }
</style>
