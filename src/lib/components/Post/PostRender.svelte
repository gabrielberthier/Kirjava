<script lang="ts">
  import { browser } from '$app/environment'
  import { onMount } from 'svelte'
  export let component: any
  export let html: string = ''
  import Prism from 'prismjs'
  import 'prismjs/components/prism-markup-templating' // dependency for prism-php extension
  import 'prismjs/components/prism-java' // dependency for prism-php extension
  import 'prismjs/components/prism-javascript' // dependency for prism-php extension
  import 'prismjs/components/prism-python' // dependency for prism-php extension
  import 'prismjs/components/prism-php' // dependency for prism-php extension

  let prose: HTMLElement

  onMount(async () => {
    if (browser) {
      const elements = prose.getElementsByTagName('code')

      for (const el of elements) {
        const language = el.className.split('-').pop() || ''
        const grammar = Prism.languages[language]
        if (grammar) {
          el.innerHTML = Prism.highlight(el.innerHTML, grammar, language)
        }
      }
    }
  })
</script>

{#if component}
  <div class="prose dark:prose-invert">
    <svelte:component this={component} />
  </div>
{:else}
  <div class="prose dark:prose-invert" bind:this={prose}>
    {@html html}
  </div>
{/if}
