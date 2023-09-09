<script lang="ts">
  import { placesIveWorkd } from '$lib/info'
  import { t } from '$lib/translations/common'
</script>

<div class="rounded-2xl md:px-2 md:border border-zinc-100 lg:p-6 dark:border-zinc-700/40">
  <h2 class="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="h-6 w-6 flex-none"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        class="fill-sky-100 stroke-blue-400 dark:fill-blue-100/10 dark:stroke-sky-500"
        d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z"
      />
    </svg>

    <span class="ml-3">Worked @</span>
  </h2>
  <ol class="mt-6 space-y-4">
    {#each placesIveWorkd as placeIWorkd}
      <li class="flex gap-4">
        <div
          class="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0"
        >
          <img
            alt=""
            src="/imgs/worked/{placeIWorkd.image}.png"
            width="32"
            height="32"
            decoding="async"
            data-nimg="1"
            class="h-7 w-7"
            loading="lazy"
            style="color: transparent;"
          />
        </div>
        <dl class="flex flex-auto flex-wrap gap-x-2">
          <dt class="sr-only">Name</dt>
          <dd class="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
            <span>{placeIWorkd.name}</span>
          </dd>
          <dt class="sr-only">Position</dt>
          <dd class="text-xs text-zinc-500 dark:text-zinc-400">{placeIWorkd.position}</dd>
          <dt class="sr-only">Date</dt>
          <dd
            class="ml-auto text-xs text-zinc-400 dark:text-zinc-500"
            aria-label="{placeIWorkd.from} until {placeIWorkd.to}"
          >
            <time datetime={placeIWorkd.from}>{placeIWorkd.from}</time>
            <span aria-hidden="true">—</span>
            <time datetime={placeIWorkd.to}>{placeIWorkd.to ?? 'Atualmente'}</time>
          </dd>
        </dl>
      </li>
    {/each}
  </ol>

  <a
    class="inline-flex items-center gap-2 justify-center rounded-md py-2 px-3 text-sm outline-offset-2 transition active:transition-none bg-zinc-50 font-medium text-zinc-900 hover:bg-zinc-100 active:bg-zinc-100 active:text-zinc-900/60 dark:bg-zinc-800/50 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 dark:active:bg-zinc-800/50 dark:active:text-zinc-50/70 group mt-6 w-full"
    href="/docs/Curriculum - Gabriel Berthier - EN 2022.pdf"
    download
    >Download CV<svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      class="h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50"
      ><path
        d="M4.75 8.75 8 12.25m0 0 3.25-3.5M8 12.25v-8.5"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      /></svg
    ></a
  >
</div>
