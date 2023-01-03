<script lang="ts">
  import SetColorThemeButton from '$components/Buttons/SetColorThemeButton.svelte'
  import MdLessNavContainer from '$components/Navigation/MDLessNavContainer.svelte'
  import MdPlusNav from '$components/Navigation/MDPlusNav.svelte'
  import Avatar from './Img/Avatar.svelte'
  import { headerToggle } from '$actions/header-toggle'
  import { afterNavigate } from '$app/navigation'
  import { browser } from '$app/environment'
  import LanguageSelect from '../Select/LanguageSelect.svelte'
  import init from './translations'
  import { locale } from '$lib/translations/translations'
  import type { MenuItem } from './protocols'
  import { tick } from 'svelte';
    

  const { t, loadTranslations } = init()

  console.log(locale.get())

  
  let promise = loadTranslations(locale.get())?.then(() => genMenuItems())

  let menuItemns: MenuItem[] = []
  
  locale.subscribe(async (loc) => {
    await tick()
    await loadTranslations(loc)
    genMenuItems()
  })
  
  const genMenuItems = (): void => {
    menuItemns = ['about', 'articles', 'projects', 'speaking', 'use'].map((el) => ({
      to: el,
      text: $t('menu.items.' + el)
    }))
  }

  afterNavigate((el) => {
    const header = document.querySelector('header')
    const token = 'scroll-down'
    if (browser && header && header.classList.contains(token)) {
      header.classList.remove(token)
    }
  })
</script>

{#await promise}
  Loading menu...
{:then}
  <header
    use:headerToggle
    class="pointer-events-none relative z-50 flex flex-col sticky top-0 z-50"
    style="height:var(--header-height);margin-bottom:var(--header-mb)"
  >
    <div class="top-0 z-10 h-16 pt-6" style="position:var(--header-position)">
      <div
        class="sm:px-8 top-[var(--header-top,theme(spacing.6))] w-full"
        style="position:var(--header-inner-position)"
      >
        <div class="mx-auto max-w-7xl lg:px-8">
          <div class="relative px-4 sm:px-8 lg:px-12 container-header">
            <div class="mx-auto max-w-2xl lg:max-w-5xl">
              <div class="relative flex gap-4">
                <div class="flex flex-1 ">
                  <Avatar
                    src="https://coffective.com/wp-content/uploads/2018/06/icon-house-blue.png"
                  />
                </div>
                <div class="flex flex-1 justify-end md:justify-center">
                  <MdLessNavContainer linksList={menuItemns} />
                  <MdPlusNav linksList={menuItemns} />
                </div>
                <div class="flex justify-end md:flex-1">
                  <div class="pointer-events-auto flex">
                    <SetColorThemeButton />
                    <LanguageSelect />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
{/await}

<style>
</style>
