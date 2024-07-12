<script>
  import ModalVideo from '$lib/components/Video/HolderVideoModal.svelte'
  import { t } from '$lib/translations/common'
</script>

<div class="mx-auto lg:px-12">
  
  <div class="">
    <div class="lg:max-w-5xl w-full my-12 mx-auto rounded-2xl lg:p-6 dark:border-zinc-700/40">
      <header class="max-w-3xl relative px-4 sm:px-8 lg:px-12 pb-8 mx-auto">
        <h1 class="text-4xl font-bold tracking-tight text-zinc-800 text-center sm:text-5xl dark:text-zinc-100">
          {$t('speakingspage.header')}
        </h1>
      </header>
      <div class="embed-responsive video-wrapper mx-auto text-center">
        <h3 class="text-center text-bold">DevDynamics</h3>
        <small class="text-center"><time date="06/06/2024"> 06/06/2024 </time></small>
        <ModalVideo />
      </div>
    </div>
  </div>
</div>
