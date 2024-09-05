<script lang="ts">
  import type { Tag } from '$domain/models/tag'
  import PostTag from '../Tags/PostTag.svelte'

  export let tags: Tag[] = []
</script>

<div>
  <div class="flex items-center justify-center mb-6 flex-wrap">
    {#each tags as tag}
      <PostTag {tag} />
    {/each}
  </div>
</div>
