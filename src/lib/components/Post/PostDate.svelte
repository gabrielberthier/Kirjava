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
    'relative z-10 order-first mb-3 flex text-sm text-zinc-400 dark:text-zinc-500',
    _class
  ].join(' ')}
  class:pl-3.5={decorate}
>
  {#if decorate}
    <span class="absolute inset-y-0 left-0 flex items-center py-1" aria-hidden="true">
      <span class="h-full w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
    </span>
  {/if}
  <div class="flex">
    <time datetime={post.createdAt}>
      {createdAt}
    </time>
    {#if collapsed}
      <span class="mx-1">•</span>
    {/if}
    <span class="text-end self-end">{post.readingTime}</span>
  </div>
</div>
