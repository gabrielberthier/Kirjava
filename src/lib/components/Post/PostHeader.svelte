<script lang="ts">
  import type { IPostResponse } from '$domain/models/post'
  import { format, parseISO } from 'date-fns'

  export let post: IPostResponse

  $: createdAt = post.createdAt ? format(new Date(parseISO(post.createdAt)), 'MMMM d, yyyy') : ''
</script>

<header class="flex flex-col">
  <h1 class="mt-8 mb-8 text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl text-center">
    {post.title}
  </h1>
  <div class="flex items-center order-first text-base text-zinc-400 dark:text-zinc-500 pt-5">
    <span class="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
    <time dateTime={post.createdAt}>
      <span class="ml-3">{createdAt}</span>
    </time>
    <span class="mx-2">•</span>
    <span>{post.readingTime}</span>
  </div>
</header>
