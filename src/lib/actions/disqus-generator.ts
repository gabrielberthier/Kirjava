import { browser } from '$app/environment'

const mountNewDisqus = ({ identifier, url }: DisqusConfig) => {
    (function() { // DON'T EDIT BELOW THIS LINE
        var d = document, s = d.createElement('script');
        s.src = 'https://gabrieu.disqus.com/embed.js';
        s.setAttribute('data-timestamp', String(new Date().getTime()));
        (d.head || d.body).appendChild(s);
        })()

  return true
}

const unmountDisqus = () => {
  if (browser) {
    document.getElementById('disqus-config-block')?.remove()
    document.getElementById('disqus-app-block')?.remove()
  }

  return true
}

interface DisqusConfig {
  identifier?: string
  url?: string
}

export function DisqusThread(node: HTMLElement, params: DisqusConfig) {    
  if (!params.identifier || params.identifier === window.location.pathname)
    console.warn(
      "Warning: disqus-svelte Comments created without 'identifier' property. This is not recommended & default settings are not guaranteed to work."
    )

  const thread = document.createElement('div')
  thread.id = 'disqus_thread'
  node.appendChild(thread)

  mountNewDisqus(params)

  return {
    update(new_params: DisqusConfig) {
      unmountDisqus()
      mountNewDisqus(new_params)
    },

    destroy() {
      unmountDisqus()
    }
  }
}
