<script lang="ts">
  import SocialLinks from '$components/Social/SocialLinks.svelte'
  import { avatar, name, whereIam } from '$lib/info'
  import { t } from '$lib/translations/common'
</script>

<div class="relative md:px-4 sm:px-0 lg:px-12">
  <section class="flex flex-col gap-16 pt-8 pb-16">
    <div class="w-full gap-6 rounded-lg items-center">
      <img
        src={avatar}
        alt={name}
        class="rounded-full w-36 h-36 ring-2 ring-zinc-200 dark:ring-zinc-700 max-md:mx-auto"
      />
      <div class="my-6 max-w-2xl lg:max-w-1/4">
        <div class="max-md:text-center " style="text-align: justify; text-justify: inter-word;">
          <h1
            class="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl"
          >
            Gabriel Berthier
          </h1>
          <p
            class="text-base
            text-zinc-600 dark:text-zinc-400
            max-md:text-justify text-base text-zinc-600
            dark:text-zinc-400 relative
            sm:py-6 max-md:my-4"
            
          >
            {@html $t('bio.whoammi')}
          </p>
          <div
            class="flex gap-6 mt-4 max-md:py-4 max-md:flex-center max-md:justify-center"
          >
            <a href="/about" class="group flex justify-center" aria-label="Follow on Twitter">
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
            </a>
          </div>
          <div class="flex gap-6 mt-4 max-md:py-3 max-md:flex-center max-md:justify-center">
            <SocialLinks />
          </div>
        </div>
      </div>
    </div>
  </section>
</div>
