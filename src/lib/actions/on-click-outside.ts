import type { Action, ActionReturn } from 'svelte/action'

/** Dispatch event on click outside of node */
interface Attributes {
  'on:clickoutside': (e: CustomEvent<boolean>) => void
}

export const clickOutside: Action<HTMLDivElement> = (node): ActionReturn<undefined, Attributes> => {
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
