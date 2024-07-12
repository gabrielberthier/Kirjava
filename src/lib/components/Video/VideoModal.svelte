<script>
  import { createEventDispatcher } from 'svelte'
  import { clickOutside } from '$lib/actions/on-click-outside'

  const dispatch = createEventDispatcher()

  function clickedOutSide() {
    dispatch('clickOutsideModalButton')
  }

  function handleWindowKeyDown(event) {
    if (event.key === 'Escape') {
      dispatch('escapeWindow')
    }
  }

  function handleMousedown(e) {
    lastMouseDown = new Date()
    alert()
  }
  function handleMouseup(e) {
    console.log('test')
    if (new Date() - lastMouseDown < 300) {
      if (paused) {
        e.target.play()
      } else {
        e.target.pause()
      }
    }
  }

  export let isOpen = false
  let paused = true

  $: isOpen ? console.log('Open') : console.log('Closed')
</script>

{#if isOpen}
  <div id="modal" class="fixed inset-0 z-[99999] flex p-6" role="dialog" aria-modal="true">
    <div class="mx-auto w-full max-w-5xl h-full flex items-center" >
      <div
        class="w-full max-h-full rounded-3xl shadow-2xl aspect-video bg-black overflow-hidden video-wrapper"
        use:clickOutside on:clickoutside={clickedOutSide}
      >
        <!-- <video width="1920" height="1080" loop controls bind:paused>
          <source
            src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
            type="video/mp4"
          />
          <track kind="captions" src="sampleCaptions.vtt" srclang="pt" />
          Your browser does not support the video tag.
        </video> -->

        <iframe
          class="rouded video-gabo w-full"
          style="border-radius: 10px; overflow: hidden;"
          src="https://www.youtube.com/embed/4WffLhdSBeI?si=p530PeQ67Ik2EiRt"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        />
      </div>
    </div>
  </div>
{/if}
<svelte:window on:keydown={handleWindowKeyDown} />

<style>
  .video-gabo {
    aspect-ratio: 16 / 9;
    width: 100%;
  }
  .video-wrapper iframe {

  }
</style>
