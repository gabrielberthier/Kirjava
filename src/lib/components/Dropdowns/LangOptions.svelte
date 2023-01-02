<script lang="ts">
  import { clickOutside } from '$lib/actions/on-click-outside'
  import { getFlagEmoji } from '$services/utils/functions'

  export let langs: string[]

  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  function close() {
		dispatch('close-dropdown');
	}
</script>

<div
  class="absolute right-0 z-10 mt-2 w-15 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
  role="menu"
  aria-orientation="vertical"
  aria-labelledby="menu-button"
  tabindex="-1"
  use:clickOutside
  on:clickoutside={close}
>
  <div class="py-1" role="none">
    {#each langs as lang, i}
      <a
        href="/{lang}"
        class="text-gray-700 block px-4 py-2 text-sm"
        role="menuitem"
        tabindex="-1"
        id="menu-item-{i}">{getFlagEmoji(lang)}</a
      >
    {/each}
  </div>
</div>
