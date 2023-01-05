<script lang="ts">
  import { locale } from '$lib/translations/translations'
  let href: string = ''

  locale.subscribe((l) => (href = `/${l}`))
</script>

<div
  class="h-10 w-10 rounded-full 
bg-white/90 p-0.5 shadow-lg 
shadow-zinc-800/5 ring-1 
ring-zinc-900/5 backdrop-blur 
dark:bg-zinc-800/90 dark:ring-white/10"
>
  <a aria-label="Home" {href} class="pointer-events-auto">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="rounded-full stroke-sky-500 object-cover dark:bg-zinc-800 h-7 w-7 mx-auto pt-1"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
      />
    </svg>
  </a>
</div>
