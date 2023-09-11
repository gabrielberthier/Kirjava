<script lang="ts">
  import { page } from '$app/stores'
  import { t } from '$lib/translations/common'
  import FourOFour from '$lib/custom-pages/four-o-four.svelte'
</script>

<div>
  {#if $page.status == 404}
    <FourOFour message={$t('error.shit.happens')} />
  {:else}
    {$page.error?.message}
  {/if}
</div>
