<script lang="ts">
  import Card from '$components/Cards/Card.svelte'
  import ArrowRightIcon from '$components/Icons/ArrowRightIcon.svelte'
  import type { IPostResponse } from '$domain/models/post'
  import { locale } from '$lib/translations/common'
  import PostDate from './PostDate.svelte'

  let loc: string

  export let post: IPostResponse

  locale.subscribe((el) => (loc = el))

  $: excerpt = post.preview.text || post.preview.html
</script>

<Card href={`/${loc}/posts/${post.slug}`} >
  <slot slot="eyebrow" name="eyebrow" >
    <PostDate class="flex-col md:flex" {post} collapsed decorate="true" />
  </slot>
  <slot slot="title"
    >{post.title}
  </slot>
  <div slot="description" class="prose dark:prose-invert">
    {@html excerpt}
  </div>
  <div slot="actions">
    <div class="flex items-center text-sky-500">
      <span class="text-sm font-medium">Read</span>
    </div>
  </div>
</Card>

<style>
  .prose > :global(p) {
    margin-top: 0;
    margin-bottom: 0;
  }


</style>
