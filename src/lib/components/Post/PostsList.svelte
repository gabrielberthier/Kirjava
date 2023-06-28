<script lang="ts">
  import PostPreview from '$components/Post/PostPreview.svelte'
  import PostDate from '$components/Post/PostDate.svelte'
  import type { IPostResponse } from '$domain/models/post'

  export let posts: IPostResponse[]
</script>

<div class="flex flex-col gap-16 md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
  {#each posts as post}
    <article class="group relative flex flex-col">
      <div class="col-span-4 md:col-span-3 pt-3">
        <PostPreview {post} />
      </div>
    </article>
  {/each}
</div>
