<script lang="ts">
  import { page } from '$app/stores'
  import { menuItems } from '$lib/stores/menu-store'

  $: error404 = $page.status == 404
</script>

<footer>
  <div class="sm:px-8">
    <div class="mx-auto max-w-7xl lg:px-8">
      <div class="border-t border-zinc-100 pt-10 pb-16 dark:border-zinc-700/40">
        <div class="relative px-4 sm:px-8 lg:px-12">
          <div class="mx-auto max-w-2xl lg:max-w-5xl">
            <div class="flex flex-col items-center justify-between gap-6 sm:flex-row">
              <div
                class="flex gap-6 text-sm font-medium {error404
                  ? 'text-white'
                  : 'text-zinc-800 dark:text-zinc-200'}"
              >
                {#each $menuItems as link}
                  <a
                    class="transition hover:text-sky-500 dark:hover:text-teal-400"
                    href="{link.to}"
                  >
                    {link.text}
                  </a>
                {/each}
              </div>
              <p class="text-sm text-zinc-400 dark:text-zinc-500">
                © <!-- -->2022<!-- --> Gabriel Berthier. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</footer>
