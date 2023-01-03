<script lang="ts">
  import { page } from '$app/stores'
  import { locale } from '$lib/translations/translations'
    import type { MenuItem } from '../Header/protocols'

  export let linksList: MenuItem[]

  let loc = ''
  locale.subscribe((el) => (loc = el))
</script>

<nav class="pointer-events-auto hidden md:block">
  <ul
    class="flex rounded-full bg-white/90 px-3 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10"
  >
    {#each linksList as link}
      <li>
        <a
          class="relative block px-3 py-2 transition hover:text-sky-500 dark:hover:text-sky-400"
          href="/{loc}/{link.to.toLocaleLowerCase()}"
        >
          {link.text}
        </a>
      </li>
    {/each}
  </ul>
</nav>
