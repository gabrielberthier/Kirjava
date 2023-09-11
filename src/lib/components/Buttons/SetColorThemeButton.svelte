<script lang="ts">
  import { browser } from '$app/environment'
  import { Moon, Sun } from "svelte-heros-v2";

  let isDarkMode = browser ? Boolean(document.documentElement.classList.contains('dark')) : true

  function disableTransitionsTemporarily() {
    document.documentElement.classList.add('[&_*]:!transition-none')
    window.setTimeout(() => {
      document.documentElement.classList.remove('[&_*]:!transition-none')
    }, 0)
  }
</script>

<button
  type="button"
  role="switch"
  aria-label="Toggle Dark Mode"
  aria-checked={isDarkMode}
  class=" mr-1 group rounded-full bg-white px-3 py-2 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur transition dark:bg-zinc-800/90 dark:ring-white/10 dark:hover:ring-white/20"
  on:click={() => {
    isDarkMode = !isDarkMode
    localStorage.setItem('isDarkMode', isDarkMode.toString())

    disableTransitionsTemporarily()

    if (isDarkMode) {
      document.querySelector('html')?.classList.add('dark')
    } else {
      document.querySelector('html')?.classList.remove('dark')
    }
  }}
>
  <Moon class="hidden text-blue-500 dark:block w-4 h-4" />
  <Sun class="block text-amber-300 dark:hidden w-4 h-4" />
</button>
