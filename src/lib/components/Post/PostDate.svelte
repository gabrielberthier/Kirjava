<script lang="ts">
  import type { IPostResponse } from '$domain/models/post'
  import { format, parseISO } from 'date-fns'

  export let decorate = 'sm'
  export let post: IPostResponse
  export let collapsed = false

  let _class: string
  export { _class as class }

  $: createdAt = post.createdAt ? format(new Date(parseISO(post.createdAt)), 'MMMM d, yyyy') : ''
</script>

<div
  class={[
    'relative z-10 order-first mb-3 flex text-sm text-zinc-400 dark:text-zinc-500 w-full',
    _class
  ].join(' ')}
  class:pl-3.5={decorate}
>
  {#if decorate}
    <span class="absolute inset-y-0 left-0 flex items-center py-1" aria-hidden="true">
      <span class="h-full w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
    </span>
  {/if}
  <div class="flex justify-between">
    <div class="flex">
      <time datetime={post.createdAt}>
        {createdAt}
      </time>
      {#if collapsed}
        <span class="mx-1">•</span>
      {/if}
      <span class="text-end self-end">{post.readingTime}</span>
    </div>
    <span
      class="h-8 w-8 arrow-right-card
    text-blue-700 border hover:bg-blue-700
    hover:text-white focus:ring-4 focus:outline-none
    focus:ring-blue-300 p-1 font-medium rounded-full
    text-sm text-center inline-flex dark:border-blue-500
    dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-6 dark:text-white h-5 w-5"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
        />
      </svg>
    </span>
  </div>
</div>
