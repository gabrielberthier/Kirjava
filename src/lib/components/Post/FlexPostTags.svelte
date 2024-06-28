<script lang="ts">
  import type { Tag } from '$domain/models/tag'
  import PostTag from '../Tags/PostTag.svelte'

  export let tags: Tag[] = []
</script>

<div>
  <p class="text-center"><small >[Tags]</small></p>
<div class="flex items-center justify-center mb-16">
  
  {#each tags as tag}
    <PostTag {tag} />
  {/each}
</div>
</div>