<script lang="ts">
  import { browser } from '$app/environment'
  import { dateRange } from '$services/utils/time'

  export let language: string
  export let name: string
  export let createdAt: string
  export let updatedAt: string = ''
  export let url: string

  let isDarkMode = browser ? Boolean(document.documentElement.classList.contains('dark')) : true

  const extractYear = (date?: string) => (date ? new Date(date).getFullYear().toString() : '...')
  const isPresent = (date: string) => date && dateRange(date) < 31

  $: startedDate = extractYear(createdAt)
  $: lastUpdated = extractYear(updatedAt)
  $: until = isPresent(updatedAt) ? 'Present' : `${extractYear(updatedAt)}`
  $: src = isDarkMode ? '/imgs/github-mark-white.svg' : '/imgs/github-mark.svg'
</script>

<li class="flex gap-4">
  <div
    class="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0"
  >
    <img
      alt=""
      {src}
      width="32"
      height="32"
      decoding="async"
      data-nimg="1"
      class="h-7 w-7"
      loading="lazy"
      style="color: transparent;"
    />
  </div>
  <dl class="flex flex-auto flex-wrap gap-x-2">
    <dt class="sr-only">Repository</dt>
    <dd class="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
      <a href={url} target="_blank" rel="noreferrer">{name}</a>
    </dd>
    <dt class="sr-only">Language</dt>
    <dd class="text-xs text-zinc-500 dark:text-zinc-400">{language}</dd>
    <dt class="sr-only">Date</dt>
    <dd
      class="ml-auto text-xs text-zinc-400 dark:text-zinc-500"
      aria-label="{startedDate} until {until}"
    >
      <time datetime={startedDate}>{startedDate}</time> <span aria-hidden="true">—</span>
      <time datetime={lastUpdated}>{until}</time>
    </dd>
  </dl>
</li>
