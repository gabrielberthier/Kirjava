<script lang="ts">
  import PostPreview from '$components/Post/PostPreview.svelte'
  import type { IPostResponse } from '$domain/models/post'
  import { locale } from '$lib/translations/common'

  let loc: string = ''
  locale.subscribe((el) => (loc = el))

  export let posts: IPostResponse[]
</script>

<div
  class="mt-4 flex flex-col gap-8 mx-auto"
>
  {#each posts as post}
    <article class="group relative flex flex-col rounded my-2 max-w-prose mx-auto w-full">
      <div class="col-span-4 md:col-span-3 pt-3">
        <PostPreview {post} />
      </div>
    </article>
    
    <hr class="w-2/3 md:hidden h-3 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700">
  {/each}

  <a href="{loc}/posts" class="flex w-full text-xl font-medium text-sky-500" >
    <span style="text-align: center;">
      More...
    </span>
    </a
  >
</div>
