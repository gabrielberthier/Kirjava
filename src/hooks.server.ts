import { defaultLocale, locales, locale as localeStore } from '$lib/translations/common'
import type { Handle } from '@sveltejs/kit'

const routeRegex = new RegExp(/^\/[^.]*([?#].*)?$/)

export const handle: Handle = async ({ event, resolve }) => {
  const { url, request } = event
  const { pathname } = url

  if (pathname.replace('/', '').split('/').shift() === 'api') {
    return resolve(event)
  }

  if (routeRegex.test(pathname)) {
    const supportedLocales = locales.get()

    let locale = supportedLocales.find(
      (l) => `${l}`.toLowerCase() === `${RegExp(/[^/]+?(?=\/|$)/).exec(pathname)}`.toLowerCase()
    )

    if (!locale) {
      const regexLang = /^[a-z]{2,4}(-[A-Z][a-z]{3})?(-([A-Z]{2}|\d{3}))?$/
      const [acceptedLang = ''] = regexLang.exec(`${request.headers.get('accept-language')}`) ?? []

      locale = acceptedLang

      if (!supportedLocales.includes(locale)) locale = defaultLocale

      localeStore.set(locale)

      return new Response(undefined, {
        headers: { location: `/${locale}${pathname}` },
        status: 301
      })
    }

    return resolve(event, {
      transformPageChunk: ({ html }) => html.replace(/<html.*>/, `<html lang="${locale}">`)
    })
  }

  return resolve(event)
}
