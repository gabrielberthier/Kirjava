<script lang="ts">
  import { fade } from 'svelte/transition'

  export let visible = false
</script>

{#if visible}
<div
  class="fixed inset-0 z-10 bg-black bg-opacity-50 transition-opacity"
  in:fade={{ delay: 250, duration: 300 }}
  aria-hidden="true"
/>
{/if}