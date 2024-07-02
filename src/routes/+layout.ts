import { loadTranslations } from '$lib/translations/common'
import type { LayoutServerLoad } from './$types'

interface Internationalization {
  lang: string
  subject: string
}

export const load: LayoutServerLoad = async ({ url }) => {
  const { pathname } = url

  const lang = `${RegExp(/[^/]+?(?=\/|$)/).exec(pathname) || ''}`
  const route = pathname.replace(new RegExp(`^/${lang}`), '') ?? ""
  
  await loadTranslations(lang, route) // keep this just before the `return`

  const internationalization: Internationalization = {
    lang,
    subject: route
  }

  return {
    internationalization
  }
}
