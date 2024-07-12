<script lang="ts">
  import PreviewButton from './PreviewButton.svelte'
  import VideoBackdrop from './VideoBackdrop.svelte'
  import VideoModal from './VideoModal.svelte'

  let modalOpen = false

  function closeModal() {
    modalOpen = false
  }

  function openModal() {
    modalOpen = true
  }
</script>

<div class="w-full max-w-6xl mx-auto px-4 md:px-6 flex" style="justify-content: space-between;">
  <div class="mx-auto">
    <PreviewButton on:clickModalButton={openModal} />
  </div>
  <VideoBackdrop visible={modalOpen} />
  <VideoModal
    isOpen={modalOpen}
    on:escapeWindow={closeModal}
    on:clickOutsideModalButton={closeModal}
  />
</div>
