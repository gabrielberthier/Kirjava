<script lang="ts">
  import type { Heading } from '$domain/models/post'
  import ToC from '../ToC/ToC.svelte'

  export let headings: Heading[] = []
</script>

<div class="hidden lg:block pt-10">
  <aside class="sticky hidden w-48 ml-2 lg:block top-16 pl-3" aria-label="Table of Contents">
    <ToC {headings} />
  </aside>
</div>
