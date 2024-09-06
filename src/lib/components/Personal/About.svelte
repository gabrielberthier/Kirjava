<script lang="ts">
  import SocialLinks from '$components/Social/SocialLinks.svelte'
  import { avatar, name } from '$lib/info'
  import { t } from '$lib/translations/common'
</script>

<div class="md:px-4 lg:px-12 ">
  <section class="flex pt-8">
    <div class="rounded-lg items-center">
      <div class="absolute banner-gabri-2 -top-72">
        <div class="w-full h-full area">
          <ul class="circles">
            <li />
            <li />
            <li />
            <li />
            <li />
          </ul>
        </div>
      </div>
      <div class="">
        <img
          src={avatar}
          alt={name}
          class="rounded-full w-36 h-36 ring-2 ring-zinc-200 dark:ring-zinc-700
         border-solid border-2 border-sky-700 shadow-2xl max-md:mx-auto
        dark:shadow-gray-800 z-10 relative shadow-3xl transition-shadow duration-300 ease-in-out h-auto max-w-full" 
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
            <div class="flex gap-2 max-md:flex-center pr-4">
              <SocialLinks />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>

<style lang="scss">
  @import "./styles/banner.scss"
</style>