<script lang="ts">
  import RepositoryListItem from './RepositoryListItem.svelte'
  import { t } from '$lib/translations/common'
  import { GitHubApi } from '$services/api/github-api'
  import { onMount } from 'svelte'
  interface IGitHubRepo {
    language: string
    name: string
    createdAt: string
    updatedAt?: string
    url: string
  }

  let repositories: IGitHubRepo[] = []
  const githubApi = new GitHubApi()

  onMount(async () => {
    const el = await githubApi.getRepositories()

    repositories = el
  })
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
    <span class="ml-3">GitHub Projects</span>
  </h2>
  {#if repositories.length}
    <ol class="mt-6 space-y-4">
      {#each repositories as repo}
        <RepositoryListItem {...repo} />
      {/each}
    </ol>
  {:else}
    <div class="p-3 max-w-md">
      <h3 class="py-2">
        grr
        <img src="/imgs/grr.png" alt="grr icon" class="inline w-6" />
      </h3>

      <p class="text-sm">
        {@html $t('error.github')}
      </p>
    </div>
  {/if}
</div>
