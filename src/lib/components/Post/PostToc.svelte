<script lang="ts">
  import type { Heading } from '$domain/models/post'
  import ToC from '../ToC/ToC.svelte'

  export let headings: Heading[] = []
</script>

<div class="hidden lg:block pt-10">
  <aside class="sticky hidden w-48 ml-16 lg:block top-32 pl-3" aria-label="Table of Contents">
    <ToC {headings} />
  </aside>
</div>
