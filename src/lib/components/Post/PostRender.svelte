<script lang="ts">
  import { onMount } from 'svelte'

  export let component: any
  export let html: string = ''

  onMount(async () => {
    await import('$lib/prism')
  })
</script>

{#if component}
  <div class="prose dark:prose-invert">
    <svelte:component this={component} />
  </div>
{:else}
  <div class="prose dark:prose-invert">
    {@html html}
  </div>
{/if}
