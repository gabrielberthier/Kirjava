<script lang="ts">
  import PostPage from '$lib/components/Post/PostPage.svelte'
  import type { PageData } from './$types'

  export let data: PageData
</script>

<PostPage post={data.post} component={data.component} />