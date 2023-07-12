<script>
  import SocialLinks from '../Social/SocialLinks.svelte'
  import { name, avatar } from '$lib/info'
</script>

<div class="py-8">
  <!-- Ordering using flex -->
  <!-- <div class="grid gap-8">
          <div class="flex justify-center order-1 col-span-2 gap-6 md:order-2">
            <SocialLinks />
          </div>
          <div class="flex justify-center order-2 md:order-1 md:col-span-2">
            <a href="/" class="inline-block rounded-full">
              <img
                src={avatar}
                alt={name}
                class="w-16 h-16 mx-auto rounded-full md:w-28 md:h-28 ring-2 ring-zinc-200 dark:ring-zinc-700"
              />
            </a>
          </div>
        </div> -->

  <div class="flex flex-col gap-8 pt-4">
    <div class="flex justify-center">
      <a href="/" class="inline-block rounded-full">
        <img
          src={avatar}
          alt={name}
          class="w-16 h-16 mx-auto rounded-full md:w-28 md:h-28 ring-2 ring-zinc-200 dark:ring-zinc-700"
        />
      </a>
    </div>
    <div class="flex justify-center">
      <p>Author: <b>Gabriel Berthier</b></p>
    </div>
    <div class="flex justify-center col-span-2 gap-6">
      <SocialLinks />
    </div>
  </div>
</div>
