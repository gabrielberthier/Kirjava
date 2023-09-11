import { browser } from '$app/environment'
import { t } from '$lib/translations/common'
import type { AfterNavigate } from '@sveltejs/kit'
import type { MenuItem } from './protocols'

export const updateHeaderAfterNavigate = (el: AfterNavigate) => {
  const header = document.querySelector('header')
  const token = 'scroll-down'
  if (browser && header && header.classList.contains(token)) {
    header.classList.remove(token)
  }
}

export const onUpdateItems = (loc: string): MenuItem[] => {
  const items = ['about', 'articles', 'projects', 'speaking', 'books']

  return [
    ...items.map((el: string) => ({
      to: `/${loc}/${el.toLocaleLowerCase()}`,
      text: t.get('menu.items.' + el)
    }))
  ]
}
