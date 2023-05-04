<script lang="ts">
  import type { Tag } from '$domain/models/tag'

  export let tag: Tag
</script>

<div
  class="ml-4 text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 mt-1 rounded-full bg-white text-gray-700 border"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    class="feather feather-hard-drive mr-2"
    width="16"
    height="16"  
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5"
    />
  </svg>

  {tag.name}
</div>
