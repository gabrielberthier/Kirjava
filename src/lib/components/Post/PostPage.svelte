<script lang="ts">
  import { format, parseISO } from 'date-fns'
  import { website, name, avatar } from '$lib/info'
  import { afterNavigate, goto } from '$app/navigation'
  import { onMount } from 'svelte'
  import type { IPostResponse } from '$domain/models/post'
  import { page } from '$app/stores'

  import ToC from '$components/ToC/ToC.svelte'
  import ArrowLeftIcon from '$components/Icons/ArrowLeftIcon.svelte'
  import SocialLinks from '$components/Social/SocialLinks.svelte'
  import Disqus from '$components/Disqus/index.svelte'
  import PostTag from '../Tags/PostTag.svelte'

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

  onMount(async () => {
    await import('$lib/prism')
  })

  $: createdAt = post.createdAt ? format(new Date(parseISO(post.createdAt)), 'MMMM d, yyyy') : ''

  // generated open-graph image for sharing on social media.
  // see https://og-image.vercel.app/ for more options.
  const ogImage = `https://og-image.vercel.app/**${encodeURIComponent(
    post.title || ''
  )}**?theme=light&md=1&fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fhyper-color-logo.svg`

  const url = `${website}/${post.slug}`

  // if we came from /posts, we will use history to go back to preserve
  // posts pagination
  let canGoBack = false
  afterNavigate(({ from }) => {
    if (from && from.url.pathname.startsWith('/posts')) {
      canGoBack = true
    }
  })

  function goBack() {
    if (canGoBack) {
      history.back()
    }
  }
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
  <div class="hidden lg:block pt-8">
    <div class="sticky top-0 flex justify-start xl:justify-end pt-7 pr-8">
      <svelte:element
        this={canGoBack ? 'button' : 'a'}
        class="items-center justify-center hidden w-10 h-10 mb-8 transition bg-white rounded-full shadow-md -top-1 -left-16 lg:flex group shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0 dark:focus-visible:ring-2 dark:ring-white/10 dark:hover:border-zinc-700 dark:hover:ring-white/20"
        href={canGoBack ? undefined : '/posts'}
        aria-label="Go back to posts"
        on:click={goBack}
        on:keydown={goBack}
      >
        <ArrowLeftIcon
          _class=""
          class="w-4 h-4 transition stroke-zinc-500 group-hover:stroke-zinc-700 dark:stroke-zinc-500 dark:group-hover:stroke-zinc-400"
        />
      </svelte:element>
    </div>
  </div>

  <div class="w-full mx-auto overflow-x-hidden">
    <article>
      <header class="flex flex-col">
        <h1
          class="mt-6 text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl"
        >
          {post.title}
        </h1>
        <div class="flex items-center order-first text-base text-zinc-400 dark:text-zinc-500">
          <span class="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
          <time dateTime={post.createdAt}>
            <span class="ml-3">{createdAt}</span>
          </time>
          <span class="mx-2">•</span>
          <span>{post.readingTime}</span>
        </div>
      </header>
      <div class="flex items-center pt-5 flex-wrap">
        {#each post.tags as tag}
          <PostTag {tag} />
        {/each}
      </div>

      <!-- render fig caption if exists -->
      {#if post.featureImage}
        <figure class="max-w-lg">
          <img class="h-auto max-w-full rounded-lg" src={post.featureImage} />
          {#if post.featureImage}
            <figcaption class="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">
              {post.featureImageCaption}
            </figcaption>
          {/if}
        </figure>
      {/if}
      <!-- render the post -->
      {#if component}
        <div class="prose dark:prose-invert">
          <svelte:component this={component} />
        </div>
      {:else}
        <div class="prose dark:prose-invert">
          {@html post.preview.html}
        </div>
      {/if}
    </article>

    <!-- bio -->
    <hr />
    <div class="py-8">
      <!-- Ordering using flex -->
      <!-- <div class="grid gap-8">
          <div class="flex justify-center order-1 col-span-2 gap-6 md:order-2">
            <SocialLinks />
          </div>
          <div class="flex justify-center order-2 md:order-1 md:col-span-2">
            <a href="/" class="inline-block rounded-full">
              <img
                src={avatar}
                alt={name}
                class="w-16 h-16 mx-auto rounded-full md:w-28 md:h-28 ring-2 ring-zinc-200 dark:ring-zinc-700"
              />
            </a>
          </div>
        </div> -->
      <div class="flex flex-col gap-8 pt-4">
        <div class="flex justify-center">
          <a href="/" class="inline-block rounded-full">
            <img
              src={avatar}
              alt={name}
              class="w-16 h-16 mx-auto rounded-full md:w-28 md:h-28 ring-2 ring-zinc-200 dark:ring-zinc-700"
            />
          </a>
        </div>
        <div class="flex justify-center">
          <p>Author: <b>Gabriel Berthier</b></p>
        </div>
        <div class="flex justify-center col-span-2 gap-6">
          <SocialLinks />
        </div>
      </div>
    </div>
  </div>

  <!-- table of contents -->
  <div class="hidden xl:block pt-10">
    <aside class="sticky hidden w-48 ml-8 xl:block top-16 pl-5" aria-label="Table of Contents">
      <ToC {post} />
    </aside>
  </div>
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
</style>
