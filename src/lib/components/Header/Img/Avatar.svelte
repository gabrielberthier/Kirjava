<script lang="ts">
    export let src: string;
</script>

<div
  class="h-10 w-10 rounded-full 
bg-white/90 p-0.5 shadow-lg 
shadow-zinc-800/5 ring-1 
ring-zinc-900/5 backdrop-blur 
dark:bg-zinc-800/90 dark:ring-white/10"
>
  <a aria-label="Home" class="pointer-events-auto" href="/"
    ><img
      alt=""
      sizes="2.25rem"
      {src}
      width="512"
      height="512"
      decoding="async"
      data-nimg="1"
      class="rounded-full bg-zinc-100 object-cover dark:bg-zinc-800 h-9 w-9"
      style="color:transparent"
    /></a
  >
</div>
