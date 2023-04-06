<script lang="ts">
  import { t } from '$lib/translations/common'
</script>

<div class="mx-auto max-w-7xl lg:px-12" style="min-height: 600px;">
  <div class="text-center">
    <header class="pt-4">
      <h1 class="text-4xl font-bold tracking-tight sm:text-5xl">{$t('books.title')}</h1>
      <p class="mt-6">{$t('books.text')}</p>
    </header>
  </div>

  <div class="mx-auto max-w-2xl lg:max-w-5xl my-12">
    <div class="mt-16 sm:mt-20">
      <ul class="grid gap-x-12 gap-y-16 grid-cols-1">
        <li class="group relative flex items-start flex-col md:flex-row">
          <div class="min-w-full md:min-w-[20%] h-full">
            <div
              class="relative z-10 md:top-5 align-middle flex md:h-36 md:w-36 items-center justify-center
              bg-white shadow-md max-md:rounded shadow-zinc-800/5 ring-1 ring-zinc-900/5
              dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0 mx-auto max-md:p-5"
            >
              <img
                alt=""
                src="/imgs/dores-cover.jpg"
                decoding="async"
                data-nimg="1"
                class="w-fit"
                loading="lazy"
                style="color: transparent;"
              />
            </div>
          </div>
          <div class="flex flex-col">
            <h2 class="max-md:mt-6 text-base font-semibold text-zinc-800 dark:text-zinc-100">
              <div
                class="absolute -inset-y-6 -inset-x-4 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50 sm:-inset-x-6 sm:rounded-2xl"
              />
              <div>
                <span class="absolute -inset-y-6 -inset-x-4 z-20 sm:-inset-x-6 sm:rounded-2xl" />
                <span class="relative z-10">As Dores Crônicas</span>
              </div>
            </h2>
            <p class="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              {$t('books.dores_cronicas')}
            </p>
            <p
              class="relative z-10 mt-6 flex text-sm font-medium text-zinc-400 transition group-hover:text-sky-500 dark:text-zinc-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15M9 12l3 3m0 0l3-3m-3 3V2.25"
                />
              </svg>

              <span class="ml-2">Download</span>
            </p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</div>
