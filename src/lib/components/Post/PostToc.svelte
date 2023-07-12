<script lang="ts">
  import type { Heading } from '$domain/models/post'
  import ToC from '../ToC/ToC.svelte'

  export let headings: Heading[] = []
</script>

<div class="hidden xl:block pt-10">
  <aside class="sticky hidden w-48 ml-8 xl:block top-16 pl-5" aria-label="Table of Contents">
    <ToC {headings} />
  </aside>
</div>
