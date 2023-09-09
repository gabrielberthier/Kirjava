<script lang="ts">
  import ArrowRightIcon from '$components/Icons/ArrowRightIcon.svelte'
  import PostsList from '$components/Post/PostsList.svelte'
  import NewsLetter from '$lib/components/Forms/NewsLetter.svelte'
  import SmallNewsLetter from '$lib/components/Forms/SmallNewsLetter.svelte'
  import About from '$lib/components/Personal/About.svelte'
  import GitProjects from '$lib/components/Personal/GitProjects.svelte'
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
<div class="mx-auto max-w-7xl lg:px-8 relative">
  <div class="gap-8 pb-16 relative">
    <!--  -->
    <!-- bio -->
    <div class="grid max-w-xl grid-cols-1 sm:px-8 lg:px-12 lg:grid-cols-2 lg:max-w-none">
      <About />
      <div class="justify-center items-center flex">
        <div class="lg:w-3/4">
          <NewsLetter />
        </div>
      </div>
    </div>

    <section class="mx-auto max-w-2xl lg:max-w-5xl mt-4 md:max-w-none mt-8">
      <div
        class="mx-auto grid max-w-xl grid-cols-1 gap-y-20 md:max-w-3xl lg:max-w-none lg:grid-cols-2"
      >
        {#if data.posts.length}
          <div>
            <div class="flex justify-between mb-5">
              <h2 class="text-sm font-medium sm:text-base text-zinc-400 dark:text-zinc-500">
                Recently Published
              </h2>
              <a href="{loc}/posts" class="flex text-sm font-medium text-sky-500">
                View All <ArrowRightIcon _class="w-6 h-6" /></a
              >
            </div>
            <div class="flex items-center gap-4 mb-4">
              <PostsList posts={data.posts} />
            </div>
          </div>
        {:else if data.postError}
          <div class="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
            <p class="font-bold">Falha ao buscar os últimos posts - {data.postError.status}</p>
            <p>{data.postError.message}</p>
          </div>
        {/if}
        <div
          class="space-y-10 lg:pl-16 xl:pl-24 md:flex items-center
          justify-items-stretch max-w-3xl
          md:pl-0 md:gap-6
          flex-col md:flex-row lg:flex-col md:justify-between"
        >
          <GitProjects repositories={data.repositories} />
          <WorkedOnCard />
        </div>
      </div>
    </section>
  </div>
</div>
