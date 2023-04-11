<script lang="ts">
  import { locales, locale } from '$lib/translations/common'

  import { goto } from '$app/navigation'
  import { getFlagEmoji } from '$services/utils/functions'

  function onChange(event: Event) {
    const target = event.target as HTMLSelectElement

    locale.set(target.value)

    goto(target.value)
  }

  export let route: string = ''
</script>

<div class="flex justify-center">
  <div >
    <select
      on:change={onChange}
      id="langs"
      class="form-select form-select-sm
      appearance-none
      block
      w-full
      px-3
      py-2
      text-sm
      font-normal
      text-gray-700
      bg-white bg-clip-padding bg-no-repeat
      dark:text-zinc-100
      dark:bg-zinc-900
      rounded
      transition
      ease-in-out
      shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur 
      transition dark:bg-zinc-800/90 dark:ring-white/10 dark:hover:ring-white/20
      m-0 rounded-full cursor-pointer
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
      aria-label=".form-select-sm example"
    >
      {#each $locales as lc}
        <option value="/{lc}{route}" class="w-4 h-4" selected={lc === $locale}>{getFlagEmoji(lc || '')}</option>
      {/each}
    </select>
  </div>
</div>
