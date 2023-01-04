<script lang="ts">
  import type { IGitHubRepo } from '$domain/models/github/user-repositories'
  import RepositoryListItem from './RepositoryListItem.svelte'

  const src = 'https://cdn-icons-png.flaticon.com/512/25/25231.png'

  export let repositories: IGitHubRepo[]
</script>

<div class="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
  <h2 class="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      class="h-6 w-6 flex-none"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        class="fill-sky-100 stroke-blue-400 dark:fill-blue-100/10 dark:stroke-sky-500"
        d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z"
      />
    </svg>
    <span class="ml-3">Been Workin on</span>
  </h2>
  {#if repositories.length}
  <ol class="mt-6 space-y-4">
    {#each repositories as repo}
      <RepositoryListItem {...repo} />
    {/each}
  </ol>
  {:else}
  <div class="p-3">
  <h3 class="py-2">Damn
    <img src="/imgs/OIP.jfif" alt="grr icon" class="inline w-6">
  </h3> 
  
    <p class="text-sm">It seems like an error occorured while fetching my repos at GitHub or they finally took my connection down for their API (grr bastads). But you can still check my repos out at <a href="https://github.com/gabrielberthier?tab=repositories" class="link text-sky-500">GitHub</a> ;)</p>
  </div>
  {/if}
 
  <a
    class="inline-flex items-center gap-2 justify-center rounded-md py-2 px-3 text-sm outline-offset-2 transition active:transition-none bg-zinc-50 font-medium text-zinc-900 hover:bg-zinc-100 active:bg-zinc-100 active:text-zinc-900/60 dark:bg-zinc-800/50 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 dark:active:bg-zinc-800/50 dark:active:text-zinc-50/70 group mt-6 w-full"
    href="/docs/Curriculum - Gabriel Berthier - EN 2022.pdf" download
    >Download CV<svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      class="h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50"
      ><path
        d="M4.75 8.75 8 12.25m0 0 3.25-3.5M8 12.25v-8.5"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      /></svg
    ></a
  >
</div>
