<script lang="ts">
  import { DisqusThread } from '../../actions/disqus-generator'
  export let container = 'disqus_container'
  export let url = 'https://gabrieu.disqus.com/embed.js'
  export let identifier: string
  
</script>

<div class="relative md:px-4 sm:px-0">
  <section class="flex flex-col gap-16 pt-8 pb-16 mx-auto max-w-7xl lg:px-36">
    <div
      use:DisqusThread={{
        identifier,
        url
      }}
      class={container}
    />
  </section>
</div>
