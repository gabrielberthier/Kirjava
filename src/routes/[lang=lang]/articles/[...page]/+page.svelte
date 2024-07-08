<script lang="ts">
  import { name } from '$lib/info'
  import ArrowLeftIcon from '$components/Icons/ArrowLeftIcon.svelte'
  import ArrowRightIcon from '$components/Icons/ArrowRightIcon.svelte'
  import PostsList from '$components/Post/PostsList.svelte'
  import type { PageData } from './$types'
  import { t } from '$lib/translations/common'
  import TagsBox from '$lib/components/Tags/TagsBox.svelte'

  export let data: PageData

  $: isFirstPage = data.page === 1
  $: hasNextPage = data.meta?.pagination.next
  $: posts = data.posts
  $: tags = data.tags
</script>

<svelte:head>
  <title>{name} | Articles</title>
</svelte:head>
<div class="mx-auto max-w-7xl lg:px-8">
  <div class="grid grid-cols-1 lg:max-w-5xl mx-auto">
    <div class="relative px-4 sm:px-8 lg:px-12">
      <div class="flex flex-col flex-grow mx-auto">
        <header class="pt-4 flex">
          <div>
            <h1 class="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
              {$t('articlespage.title')}
            </h1>
            <p class="mt-6 text-left">{$t('articlespage.text')}</p>
          </div>
        </header>

        {#if posts.length}
          <div class="mt-4 max-w-2xl mx-auto">
            <PostsList {posts} />
          </div>
        {:else}
          <img src="/imgs/empty.jpg" alt="Empty..." class="max-w-full h-auto rounded-lg mt-12" />
        {/if}

        <!-- pagination -->
        <div class="flex items-center justify-between pt-16 pb-8">
          {#if !isFirstPage}
            <a href={`/posts/page/${data.page - 1}`} data-sveltekit-preload-data>
              <ArrowLeftIcon _class="w-4 h-4" />
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
</div>

<style lang="postcss">
  a {
    @apply flex items-center gap-2 font-medium text-zinc-700;
  }

  :global(.dark) a {
    @apply text-zinc-300;
  }
</style>
