<script lang="ts">
  import MoonIcon from 'heroicons-svelte/solid/MoonIcon.svelte'
  import SunIcon from 'heroicons-svelte/solid/SunIcon.svelte'
  import { browser } from '$app/environment'

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
  class="w-8 h-8 p-1"
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
  <MoonIcon class="hidden text-blue-500 dark:block" />
  <SunIcon class="block text-amber-400 dark:hidden" />
</button>
