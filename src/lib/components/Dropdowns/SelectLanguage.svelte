<script lang="ts">
  import { locales } from '$lib/translations/translations'
  import { getFlagEmoji } from '$services/utils/functions'
  import LangOptions from './LangOptions.svelte'

  const langs = locales.get()

  let toggleHiddenNav = false
</script>

<div class="relative inline-block text-left">
  <div>
    <button
      type="button"
      class="inline-flex w-full justify-center bg-transparent px-2 py-2 text-sm font-medium text-gray-900 shadow-sm focus:outline-none focus:none"
      id="menu-button"
      aria-expanded="true"
      aria-haspopup="true"
      on:click={() => (toggleHiddenNav = true)}
    >
      {getFlagEmoji(langs[0] || '')}
      <!-- Heroicon name: mini/chevron-down -->
      <svg
        class="-mr-1 ml-2 h-5 w-5 mt-1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fill-rule="evenodd"
          d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
          clip-rule="evenodd"
        />
      </svg>
    </button>
  </div>
  {#if toggleHiddenNav}
    <LangOptions {langs} on:close-dropdown={() => (toggleHiddenNav = false)} />
  {/if}
</div>
