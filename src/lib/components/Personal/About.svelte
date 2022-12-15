<script lang="ts">
  import SocialLinks from '$components/Social/SocialLinks.svelte'
  import { avatar, bio, name } from '$lib/info.js'
</script>

<div class="relative px-4 lg:px-12">
  <section class="flex flex-col gap-16 pt-8 pb-16">
    <div class="w-full gap-6 rounded-lg">
      <img
        src={avatar}
        alt={name}
        class="rounded-full w-36 h-36 ring-2 ring-zinc-200 dark:ring-zinc-700"
      />
      <div class="my-6 max-w-2xl lg:max-w-5xl">
        <div class="max-w-2xl">
          <h1
            class="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl"
          >
            You know who I am
          </h1>
          <p
            class="text-base text-zinc-600 dark:text-zinc-400 text-base text-zinc-600 dark:text-zinc-400 relative sm:py-6"
          >
            {bio}
          </p>
          <div class="flex gap-6 mt-2">
            <SocialLinks />
          </div>
        </div>
      </div>
    </div>
  </section>
</div>
