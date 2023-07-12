<script lang="ts">
  import type { IPostResponse } from '$domain/models/post'

  export let post: IPostResponse
</script>

{#if post.featureImage}
  <figure class="">
    <img
      class="h-auto max-w-full rounded-lg"
      src={post.featureImage}
      alt={post.featureImageCaption || 'Feature Image Caption'}
    />
    {#if post.featureImage}
      <figcaption class="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">
        {post.featureImageCaption}
      </figcaption>
    {/if}
  </figure>
{/if}
