import type { MenuItem } from '$lib/components/Header/protocols'
import { writable } from 'svelte/store'
import type { Writable } from 'svelte/store'
import { locale } from '$lib/translations/common'
import init from '$lib/translations/menus'

export const menuItems: Writable<MenuItem[]> = writable([])

const { t, loadTranslations } = init()

const loadItems = (loc: string, items: string[]) => [
  ...items.map((el: string) => ({
    to: `/${loc}/${el.toLocaleLowerCase()}`,
    text: t.get('menu.items.' + el)
  }))
]

locale.subscribe(async (loc) => {
  await loadTranslations(loc)
  const items = ['about', 'articles', 'projects', 'speaking', 'books']

  menuItems.set(loadItems(loc, items))
})
