<script lang="ts">
  import ArrowRightIcon from '$components/Icons/ArrowRightIcon.svelte'
  import PostsList from '$components/Post/PostsList.svelte'
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
  <div class="gap-8 pb-16 relative px-4 sm:px-8 lg:px-12">
    <!--  -->
    <!-- bio -->
    <div class="grid max-w-xl grid-cols-1 lg:max-w-none">
      <About />
    </div>

    <section class="mx-auto max-w-2xl lg:max-w-5xl mt-4">
      <div class="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
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
          class="space-y-10 lg:pl-16 xl:pl-24 md:flex items-center justify-items-stretch max-w-3xl flex-col"
        >
          <form
            action="/thank-you"
            class="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40"
          >
            <h2 class="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
                class="h-6 w-6 flex-none"
                ><path
                  d="M2.75 7.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
                  class="fill-sky-100 stroke-blue-400 dark:fill-blue-100/10 dark:stroke-sky-500"
                /><path
                  d="m4 6 6.024 5.479a2.915 2.915 0 0 0 3.952 0L20 6"
                  class="stroke-zinc-400 dark:stroke-zinc-500"
                /></svg
              ><span class="ml-3">Stay up to date</span>
            </h2>
            <p class="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Get notified when I publish something new, and unsubscribe at any time.
            </p>
            <div class="mt-6 flex">
              <input
                type="email"
                placeholder="Email address"
                aria-label="Email address"
                class="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10 sm:text-sm"
              /><button
                class="inline-flex items-center gap-2 justify-center rounded-md py-2 px-3 text-sm outline-offset-2 transition active:transition-none bg-zinc-800 font-semibold text-zinc-100 hover:bg-zinc-700 active:bg-zinc-800 active:text-zinc-100/70 dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:active:bg-zinc-700 dark:active:text-zinc-100/70 ml-4 flex-none"
                type="submit">Join</button
              >
            </div>
          </form>
          <GitProjects repositories={data.repositories} />
          <WorkedOnCard />
        </div>
      </div>
    </section>
  </div>
</div>
