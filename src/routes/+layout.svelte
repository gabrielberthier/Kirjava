<script>
  import '../app.css'
  import '../prism.css'
  import { page } from '$app/stores'
  // import SetColorTheme from '$components/Buttons/SetColorThemeButton.svelte'
  import { default as Header } from '$components/Header/Default.svelte'
  import Cover from '$components/Cover/Cover.svelte'
</script>

<div class="flex flex-col min-h-screen ">
  <Cover />
  <div class="flex flex-col flex-grow w-full px-4 py-2 relative">
    <Header />
    <!-- <header class="flex items-center justify-between w-full max-w-2xl py-4 mx-auto lg:pb-8">
      <a
        class="text-lg font-bold sm:text-2xl !text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-teal-600 dark:to-teal-400"
        href="/"
      >
        Gabs
      </a>

      <SetColorTheme />
    </header> -->
    <main class="flex flex-col flex-grow w-full mx-auto">
      <div class="sm:px-8 mt-9">
        <slot />
      </div>
    </main>
  </div>
</div>
