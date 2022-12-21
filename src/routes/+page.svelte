<script lang="ts">
  import ArrowRightIcon from '$components/Icons/ArrowRightIcon.svelte'
  import PostsList from '$components/Post/PostsList.svelte'
  import About from '$lib/components/Personal/About.svelte'
  import WorkedOnCard from '$lib/components/Personal/WorkedOnCard.svelte'
  import { bio, name } from '$lib/info'
  import type { PageData } from './$types'

  export let data: PageData
</script>

<svelte:head>
  <title>{name}</title>
  <meta name="description" content={bio} />
</svelte:head>
<div class="mx-auto max-w-7xl lg:px-8 ">
  <div class="gap-8 pb-16 relative px-4 sm:px-8 lg:px-12">
    <!--  -->
    <!-- bio -->
    <div class="grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
      <About />
      <div class="space-y-10 lg:pl-16 xl:pl-24 md:flex items-center max-w-3xl">
        <WorkedOnCard />
      </div>
    </div>

    <section class="mx-auto max-w-2xl lg:max-w-5xl">
      <div class="flex items-center justify-between gap-4 mb-8">
        <h2 class="text-sm font-medium sm:text-base text-zinc-400 dark:text-zinc-500">
          Recently Published
        </h2>
        <a href="/posts" class="flex items-center gap-1 text-sm font-medium text-sky-500">
          View All <ArrowRightIcon _class="w-4 h-4" /></a
        >
      </div>
      <PostsList posts={data.posts} />
    </section>
  </div>
</div>
