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
      px-2
      py-1
      text-sm
      font-normal
      text-gray-700
      bg-white bg-clip-padding bg-no-repeat
      dark:text-zinc-100
      dark:bg-zinc-900
      border border-solid border-gray-300
      rounded
      transition
      ease-in-out
      m-0
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
      aria-label=".form-select-sm example"
    >
      {#each $locales as lc}
        <option value="/{lc}{route}" selected={lc === $locale}>{getFlagEmoji(lc || '')}</option>
      {/each}
    </select>
  </div>
</div>
