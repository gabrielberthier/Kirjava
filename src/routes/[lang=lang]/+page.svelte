<script lang="ts">
  import ArrowRightIcon from '$components/Icons/ArrowRightIcon.svelte'
  import PostsList from '$components/Post/PostsList.svelte'
  import About from '$lib/components/Personal/About.svelte'
  import WorkedOnCard from '$lib/components/Personal/WorkedOnCard.svelte'
  import { bio, name } from '$lib/info'
  import { locale } from '$lib/translations/common'
  import type { PageData } from './$types'
  let loc: string = ''
  locale.subscribe((el) => (loc = el))

  export let data: PageData
</script>

<svelte:head>
  <title>{name}</title>
  <meta name="description" content={bio} />
</svelte:head>
<div class="mx-auto max-w-7xl lg:px-8">
  <div class="gap-8 pb-16 relative px-4 sm:px-8 lg:px-12">
    <!--  -->
    <!-- bio -->
    <div class="grid max-w-xl grid-cols-1 lg:max-w-none lg:grid-cols-2">
      <About />
      <div class="space-y-10 lg:pl-16 xl:pl-24 md:flex items-center justify-items-stretch max-w-3xl flex-col">
        <WorkedOnCard repositories={data.repositories} />
        <WorkedOnCard repositories={data.repositories} />
      </div>
    </div>

    {#if data.posts.length}
      <section class="mx-auto max-w-2xl lg:max-w-5xl mt-16">
        <div class="flex items-center justify-between gap-4 mb-8">
          <h2 class="text-sm font-medium sm:text-base text-zinc-400 dark:text-zinc-500">
            Recently Published
          </h2>
          <a href="{loc}/posts" class="flex items-center gap-1 text-sm font-medium text-sky-500">
            View All <ArrowRightIcon _class="w-4 h-4" /></a
          >
        </div>

        <PostsList posts={data.posts} />
      </section>
    {:else if data.postError}
      <div class="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 mx-auto max-w-2xl lg:max-w-5xl mt-16" role="alert">
        <p class="font-bold">Falha ao buscar os últimos posts - {data.postError.status}</p>
        <p>{data.postError.message}</p>
      </div>
    {/if}
  </div>
</div>
