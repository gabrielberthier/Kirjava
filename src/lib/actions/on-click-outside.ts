/** Dispatch event on click outside of node */
export function clickOutside(node: HTMLElement) {
  const handleClick = (event: MouseEvent) => {
    const { target } = event
    if (node && !node.contains(target as Node) && !event.defaultPrevented) {
      node.dispatchEvent(
        new CustomEvent('clickoutside', {
          detail: {
            content: 'nested component is clicked'
          },
          bubbles: true
        })
      )
    }
  }

  document.addEventListener('click', handleClick, true)

  return {
    destroy() {
      document.removeEventListener('click', handleClick, true)
    }
  }
}
