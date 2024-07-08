<script lang="ts">
  import SocialLinks from '$components/Social/SocialLinks.svelte'
  import { avatar, name, whereIam } from '$lib/info'
  import { t } from '$lib/translations/common'
  import Banner from './Banner.svelte'
</script>

<div class="md:px-4 lg:px-12">
  <section class="flex flex pt-8">
    <div class="rounded-lg items-center">
      <Banner />
      <div class="">
        <img
          src={avatar}
          alt={name}
          class="rounded-full w-36 h-36 ring-2 ring-zinc-200 dark:ring-zinc-700
         border-solid border-2 border-sky-700 shadow-2xl
        dark:shadow-gray-800 z-10 relative"
        />
      </div>
      <div class="my-6">
        <div class="">
          <h1
            class="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-4xl"
          >
            {$t('bio.presentation')}
          </h1>
          <div class="lg:max-w-md">
            <p
              class="
            text-zinc-500 dark:text-zinc-400
            text-zinc-500 pr-4 md:pr-0
            max-w-prose leading-7
            dark:text-zinc-400 relative
            sm:my-6 max-md:my-4"
            >
              {@html $t('bio.whoammi')}
            </p>
          </div>
          <div
            class="flex gap-6 mt-2 max-md:py-4 max-md:flex-center justify-between md:flex-col-reverse md:justify-start"
          >
            <!-- <a href="/about" class="group flex" aria-label="Follow on Twitter">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6 pr-2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                />
              </svg>
              <span>{whereIam}</span>
            </a> -->
            <div class="flex gap-2 max-md:flex-center pr-4">
              <SocialLinks />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>
