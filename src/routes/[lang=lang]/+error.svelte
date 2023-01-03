<script lang="ts">
  import { page } from '$app/stores'
  import NotFoundScreen from '$components/ErrorPages/404.svelte'
</script>

<div>
  {#if $page.status == 404}
    <!-- Used '==' instead of '===' to match string/number status code (just to be sure) -->
    <NotFoundScreen />
  {:else}
    {$page.error?.message}
  {/if}
</div>
