export function headerToggle(node: HTMLElement) {
  const scrollUp = 'scroll-up'
  const scrollDown = 'scroll-down'
  const upTokens = [scrollUp]
  const downTokens = [scrollDown]
  let lastScroll = 0

  const handleToggle = () => {
    const currentScroll = window.pageYOffset
    if (currentScroll <= 0) {
      node.classList.remove(scrollUp)
      return
    }

    if (currentScroll > lastScroll && !node.classList.contains(scrollDown)) {
      // down
      node.classList.remove(...upTokens)
      node.classList.add(...downTokens)
    } else if (currentScroll < lastScroll && node.classList.contains(scrollDown)) {
      // up
      node.classList.remove(...downTokens)
      node.classList.add(...upTokens)
    }
    lastScroll = currentScroll
  }

  window.addEventListener('scroll', handleToggle, true)

  return {
    destroy() {
      window.removeEventListener('scroll', handleToggle, true)
    }
  }
}


