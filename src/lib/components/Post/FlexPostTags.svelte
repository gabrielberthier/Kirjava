<script lang="ts">
  import type { Tag } from '$domain/models/tag'
  import PostTag from '../Tags/PostTag.svelte'

  export let tags: Tag[] = []
</script>

<div class="flex items-center pt-5 flex-wrap">
  {#each tags as tag}
    <PostTag {tag} />
  {/each}
</div>
