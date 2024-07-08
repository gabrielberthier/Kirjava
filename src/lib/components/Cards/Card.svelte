<script>
  export let as = 'div'
  export let href = undefined

  let _class = undefined
  export { _class as class }
</script>

<svelte:element this={as} class={['relative flex flex-col items-start group hover-arrow', _class].join(' ')}>
  <slot name="eyebrow" />

  {#if $$slots.title}
    <div class="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100 w-full">
      {#if href}
        <div
          class="absolute z-0 transition scale-95 opacity-0 -inset-y-6 -inset-x-4 
          bg-zinc-50 group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50 sm:-inset-x-6 sm:rounded-2xl"
        />
        <a {href} data-sveltekit-preload-data>
          <span
            class="absolute z-20 -inset-y-6 -inset-x-4 sm:-inset-x-6 sm:rounded-2xl md:border
              md:border-gray-100 rounded-lg md:shadow dark:border-gray-100"
          />
          <h4 class="relative z-10">
            <slot name="title" />
          </h4>
        </a>
      {:else}
        <slot name="title" />
      {/if}
    </div>
  {/if}

  {#if $$slots.description}
    <div
      class="relative z-10 flex-1 text-sm text-zinc-600 dark:text-zinc-400"
      class:mt-2={!!$$slots.title}
    >
      <slot name="description" />
    </div>
  {/if}

  {#if $$slots.actions}
    <div aria-hidden="true" class="relative z-10 flex items-center mt-4">
      <slot name="actions" />
    </div>
  {/if}
</svelte:element>

<style>
  .hover-arrow :global(.arrow-right-card){
    transition: 0.1s ease-in;
  }
    .hover-arrow:hover :global(.arrow-right-card){
    margin-right: 7px;
  }
</style>