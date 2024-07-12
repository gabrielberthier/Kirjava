<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()
  function forwardClick() {
    dispatch('clickModalButton')
  }
</script>

<button
  class="relative flex justify-center items-center focus:outline-none
  focus-visible:ring
  focus-visible:ring-indigo-300 rounded-3xl group w-full"
  on:click={forwardClick}
  aria-label="Watch the video"
>
  <figure class="aspect-w-16 aspect-h-9 w-full">
    <img
      class="rounded-3xl object-cover shadow-2xl transition-shadow duration-300 ease-in-out h-auto max-w-full rounded-lg mx-auto max-h-96"
      src="https://i.ytimg.com/vi/4WffLhdSBeI/maxresdefault.jpg"
      alt="Modal video thumbnail"
      width="768"
      height="432"
    />

    <figcaption class="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">
      DevDynamics
    </figcaption>
  </figure>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    width="72" height="72"
    class="absolute pointer-events-none group-hover:scale-110 transition-transform duration-300 ease-in-out z-50 w-30 h-30"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      class="fill-white"
    />
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      class="fill-indigo-500 drop-shadow-2xl"
      d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z"
    />
  </svg>
</button>
