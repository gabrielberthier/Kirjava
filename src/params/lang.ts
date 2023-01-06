import type { ParamMatcher } from '@sveltejs/kit'
import { locales } from '$lib/translations/common'

// only accept valid languages as a segment in the URL
export const match: ParamMatcher = (param) => {
  const supportedLocales = locales.get()

  return !!supportedLocales.find((l) => `${l}`.toLowerCase() === param.toLowerCase())
}
