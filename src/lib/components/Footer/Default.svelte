<script lang="ts">
  import { page } from '$app/stores'
  import { locale } from '$lib/translations/common'
  import { onUpdateItems } from '../Header/header-behaviour'
  import type { MenuItem } from '../Header/protocols'

  let menuItems: MenuItem[] = []

  locale.subscribe(async (loc) => (menuItems = onUpdateItems(loc)))
</script>

<footer>
  <div class="max-w-7xl mx-auto overflow-hidden px-6 pt-16 lg:px-16 relative">
    <div class="border-t border-zinc-100 dark:border-zinc-700/40">
      <div class="mx-auto overflow-hidden px-6 py-24 md:px-12 lg:px-16">
        <div class="flex flex-col flex-wrap items-center justify-center lg:justify-between gap-12 sm:flex-row">
          <div
            class="-mb-6 columns-2 sm:flex sm:justify-center 
            max-sm:w-full text-sm font-medium gap-6 {$page.status == 404
              ? 'text-white'
              : 'text-zinc-800 dark:text-zinc-200'}"
          >
            {#each menuItems as link}
              <div class="pb-6">
                <a
                  class="transition hover:text-sky-500 leading-6 dark:hover:text-teal-400"
                  href={link.to}
                >
                  {link.text}
                </a>
              </div>
            {/each}
          </div>
          <p class="text-sm text-zinc-400 dark:text-zinc-500" style="min-width: fit-content;">
            ©{new Date().getFullYear()} Gabriel Berthier. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  </div>
</footer>
