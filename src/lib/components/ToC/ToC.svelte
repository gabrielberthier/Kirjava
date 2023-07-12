<script lang="ts">
  import { onMount } from 'svelte'
  import Card from '$components/Cards/Card.svelte'
  import type { Heading } from '$domain/models/post'
  import { browser } from '$app/environment'

  export let headings: Heading[] = []
  $: elements = headings
    .map((heading) => {
      if (browser) {
        return document.getElementById(heading.id)
      }
      return null
    })
    .filter((el) => el !== null)

  onMount(() => {
    setActiveHeading()
  })

  let activeHeading = headings[0]
  let scrollY: number

  function setActiveHeading() {
    scrollY = window.scrollY

    const visibleIndex =
      elements
        .filter((el) => el !== null)
        .findIndex((element) => element!.offsetTop + element!.clientHeight > scrollY) - 1

    activeHeading = headings[visibleIndex]

    const pageHeight = document.body.scrollHeight
    const scrollProgress = (scrollY + window.innerHeight) / pageHeight

    if (!activeHeading) {
      if (scrollProgress > 0.5) {
        activeHeading = headings[headings.length - 1]
      } else {
        activeHeading = headings[0]
      }
    }
  }
</script>

<svelte:window on:scroll={setActiveHeading} />

<Card>
  <slot slot="description">
    <ul class="flex flex-col gap-2">
      {#each headings as heading}
        <li
          class="pl-2 transition-colors border-teal-500 heading text-zinc-400 dark:text-zinc-600 hover:text-zinc-900 dark:hover:text-zinc-100"
          class:active={activeHeading === heading}
          style={`--depth: ${
            // consider h1 and h2 at the same depth, as h1 will only be used for page title
            Math.max(0, heading.depth - 1)
          }`}
        >
          <a href={`#${heading.id}`}>{heading.value}</a>
        </li>
      {/each}
    </ul>
  </slot>
</Card>

<style lang="postcss">
  .heading {
    padding-left: calc(var(--depth, 0) * 0.35rem);
  }

  .active {
    @apply font-medium text-slate-900 border-l-2 ml-[2px] pl-2;
  }

  /* can't use dark: modifier in @apply */
  :global(.dark) .active {
    @apply text-slate-100;
  }
</style>
