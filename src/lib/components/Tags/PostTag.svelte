<script lang="ts">
  import type { Tag } from '$domain/models/tag'
  import { page } from '$app/stores'

  export let tag: Tag

  $: isCurrentTag = $page.url.searchParams.get('tag')?.includes(tag.slug!)

  import { goto } from '$app/navigation'

  const setQueryParam = () => {
    if (!isCurrentTag) {
      goto(`?tag=${tag.slug}`)
    } else {
      goto('?')
    }
  }
</script>

<button
  class="mr-1 inline-flex items-center leading-sm uppercase
        px-3 py-1 my-1 rounded-full bg-white dark:bg-gray-900 dark:text-white cursor-pointer
        hover:text-sky-500 text-gray-700 border
        hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-indigo-500"
  on:click={() => setQueryParam()}
  class:selected={isCurrentTag}
>
  <span class="tag-badge"> {tag.name} </span>
</button>

<style lang="scss">
  .tag-badge {
    font-size: 0.75rem;
  }

  .selected {
    font-weight: 700;
    color: #6875f5;
  }
</style>
