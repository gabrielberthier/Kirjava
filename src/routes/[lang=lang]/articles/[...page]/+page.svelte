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
  <div class="grid grid-cols-1 lg:max-w-5xl mx-auto text-center">
    <div class="relative px-4 sm:px-8 lg:px-12">
      <div class="flex flex-col flex-grow mx-auto">
        <header class="pt-4 flex">
          <span class="w-24">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-16 inline h-16 text-2xl"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
          </span>
          <div>
            <h1 class="font-bold tracking-tight sm:text-5xl lg:max-w-3xl text-justify">
              {$t('articlespage.title')}
            </h1>
            <p class="mt-6 text-left">{$t('articlespage.text')}</p>
          </div>
        </header>

        {#if posts.length}
          <div class="mt-4 max-w-2xl">
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
