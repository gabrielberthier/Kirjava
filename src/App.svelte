<script lang="ts">
  import { onMount } from 'svelte'

  export let result: number = 2 + 2

  onMount(() => {
    setTimeout(() => {
      result *= 3
    }, 500)
  })
</script>

<div>{result}</div>
