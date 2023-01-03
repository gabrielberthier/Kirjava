<script lang="ts">
  import { page } from '$app/stores'
  import { t, locale, loadTranslations } from '$lib/translations/translations'
  import FourOFour from '$lib/custom-pages/four-o-four.svelte'

  export let status = $page.status
  let message: string = ''

  loadTranslations(locale.get(), 'error')?.then((el) => {
    message = $t('shit.happens')
    console.log(message);
    console.log(el)
  })

  console.log();
  
</script>

<div>
  {#if status == 404}
    <FourOFour {message}/>
  {:else}
    {$page.error?.message}
  {/if}
</div>
