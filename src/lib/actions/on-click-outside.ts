export function clickOutside(node: HTMLElement) {
  function detect({ target }: MouseEvent) {
    if (!node.contains(target as Node)) {
      node.dispatchEvent(new CustomEvent('clickoutside'))
    }
  }
  document.addEventListener('click', detect, { passive: true, capture: true })
  return {
    destroy() {
      document.removeEventListener('click', detect)
    }
  }
}
