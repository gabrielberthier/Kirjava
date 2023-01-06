<script lang="ts">
  import { name } from '$lib/info'
  import ArrowLeftIcon from '$components/Icons/ArrowLeftIcon.svelte'
  import ArrowRightIcon from '$components/Icons/ArrowRightIcon.svelte'
  import PostsList from '$components/Post/PostsList.svelte'
  import type {PageData} from './$types'
  import { t } from "$lib/translations/common";

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
          {$t('posts.title')}
        </h1>
        <p class="mt-6">{$t('posts.text')}</p>
      </header>

      <div class="mt-16 sm:mt-20">
        <PostsList posts={posts} />
      </div>

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
