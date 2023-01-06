<script lang="ts">
  import { page } from '$app/stores'
  import { t, locale, loadTranslations } from '$lib/translations/common'
  import FourOFour from '$lib/custom-pages/four-o-four.svelte'

  export let status = $page.status
  
</script>

<div>
  {#if status == 404}
    <FourOFour message={$t('error.shit.happens')}/>
  {:else}
    {$page.error?.message}
  {/if}
</div>
