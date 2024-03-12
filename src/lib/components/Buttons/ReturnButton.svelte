<script lang="ts">
  import ArrowLeftIcon from '$components/Icons/ArrowLeftIcon.svelte'
  import { afterNavigate } from '$app/navigation'

  // if we came from /posts, we will use history to go back to preserve
  // posts pagination
  let canGoBack = false
  afterNavigate(({ from }) => {
    if (from && from.url.pathname.startsWith('/posts')) {
      canGoBack = true
    }
  })

  function goBack() {
    if (canGoBack) {
      history.back()
    }
  }
</script>

<div class="hidden lg:block pt-8">
  <div class="sticky top-0 flex justify-start xl:justify-end pt-7 pr-8">
    <svelte:element
      this={canGoBack ? 'button' : 'a'}
      aria-hidden="true"
      class="items-center justify-center hidden w-10 h-10 mb-8 transition bg-white rounded-full shadow-md -top-1 -left-16 lg:flex group shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0 dark:focus-visible:ring-2 dark:ring-white/10 dark:hover:border-zinc-700 dark:hover:ring-white/20"
      href={canGoBack ? undefined : '/posts'}
      aria-label="Go back to posts"
      on:click={goBack}
      on:keydown={goBack}
    >
      <ArrowLeftIcon
        _class=""
        class="w-4 h-4 transition stroke-zinc-500 group-hover:stroke-zinc-700 dark:stroke-zinc-500 dark:group-hover:stroke-zinc-400"
      />
    </svelte:element>
  </div>
</div>
