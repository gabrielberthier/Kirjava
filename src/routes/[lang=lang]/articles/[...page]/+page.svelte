<script lang="ts">
  import { name } from '$lib/info'
  import ArrowLeftIcon from '$components/Icons/ArrowLeftIcon.svelte'
  import ArrowRightIcon from '$components/Icons/ArrowRightIcon.svelte'
  import PostsList from '$components/Post/PostsList.svelte'
  import type {PageData} from './$types'

  export let data: PageData

  $: isFirstPage = data.page === 1
  $: hasNextPage = data.meta?.pagination.next
  $: posts = data.posts
</script>

<svelte:head>
  <title>{name} | Posts</title>
</svelte:head>
<div class="mx-auto max-w-7xl lg:px-8">
  <div class="relative px-4 sm:px-8 lg:px-12">
    <div class="flex flex-col flex-grow mx-auto max-w-2xl">
      <header class="pt-4">
        <h1 class="text-4xl font-bold tracking-tight sm:text-5xl">
        All My Articles
        <span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 inline h-6 text-2xl	">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
      </span>
        </h1>
        <p class="mt-6">All of written articles collected in one place</p>
      </header>

      {#if posts.length}
      <div class="mt-16 sm:mt-20">
        <PostsList posts={posts} />
      </div>
      {:else}
      <img src="/imgs/empty.jpg" alt="Empty..." class="max-w-full h-auto rounded-lg mt-12">
      {/if}
      
      

      <!-- pagination -->
      <div class="flex items-center justify-between pt-16 pb-8">
        {#if !isFirstPage}
          <a href={`/posts/page/${data.page - 1}`} data-sveltekit-preload-data>
            <ArrowLeftIcon _class="w-4 h-4"/>
            Previous
          </a>
        {:else}
          <div />
        {/if}

        {#if hasNextPage}
          <a href={`/posts/page/${data.meta?.pagination?.next}`} data-sveltekit-preload-data
            >Next
            <ArrowRightIcon _class="w-4 h-4" />
          </a>
        {/if}
      </div>
    </div>
  </div>
</div>

<style lang="postcss">
  a {
    @apply flex items-center gap-2 font-medium text-zinc-700;
  }

  :global(.dark) a {
    @apply text-zinc-300;
  }
</style>
