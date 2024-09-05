<script lang="ts">
  import type { IPostResponse } from '$domain/models/post'
  import { format, parseISO } from 'date-fns'

  export let post: IPostResponse

  const formatter = new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
  })

  $: createdAt = post.createdAt ? formatter.format(new Date(parseISO(post.createdAt))) : ''
</script>

<header class="flex flex-col">
  <h1
    class="text-4xl md:text-5xl lg:text-6xl font-bold 
    mt-6 mb-4 
    tracking-tight text-zinc-800 dark:text-zinc-100 text-center"
  >
    {post.title}
  </h1>
  <div class="flex items-center justify-center text-base text-zinc-400 dark:text-zinc-500 my-5 text-sm">
    <time dateTime={post.createdAt}>
      <span>{createdAt}</span>
    </time>
    <span class="mx-2">-</span>
    <span>{post.readingTime}</span>
  </div>
</header>
