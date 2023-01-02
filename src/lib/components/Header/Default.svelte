<script lang="ts">
  import SetColorThemeButton from '$components/Buttons/SetColorThemeButton.svelte'
  import MdLessNavContainer from '$components/Navigation/MDLessNavContainer.svelte'
  import MdPlusNav from '$components/Navigation/MDPlusNav.svelte'
  import Avatar from './Img/Avatar.svelte'
  import { headerToggle } from '$actions/header-toggle'
  import { afterNavigate } from "$app/navigation";
    import { browser } from '$app/environment'
    import SelectLanguage from '../Dropdowns/SelectLanguage.svelte'

  afterNavigate((el) => {
    const header = document.querySelector('header')
    const token = 'scroll-down'
    if (browser && header && header.classList.contains(token)) {
      header.classList.remove(token)
    }
  })

</script>

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
                <MdLessNavContainer />
                <MdPlusNav />
              </div>
              <div class="flex justify-end md:flex-1">
                <div class="pointer-events-auto">
                  <SetColorThemeButton />
                  <SelectLanguage></SelectLanguage>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</header>

<style>
  
</style>
