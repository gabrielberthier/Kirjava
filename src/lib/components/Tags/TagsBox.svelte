<script lang="ts">
  import type { Tag } from '$domain/models/tag'
  import PostTag from '../Tags/PostTag.svelte'

  export let tags: Tag[] = []
</script>

<div
  class="max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700"
>
  <h5 class="mb-3 text-base font-semibold text-gray-900 md:text-xl dark:text-white">
    Tags Recentes
  </h5>
  <p class="text-sm font-normal text-gray-500 dark:text-gray-400" />
  <ul class="my-4 space-y-3">
    {#each tags as tag}
      <span>
        <PostTag {tag} />
      </span>
    {/each}
  </ul>
</div>
