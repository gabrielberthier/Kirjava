import i18n from 'sveltekit-i18n'
import type { Config } from 'sveltekit-i18n'
import en from './en'
import de from './de'
import cs from './cs'
import lang from './lang.json'
import pt from './pt'

const config: Config = {
  translations: {
    en: {
      ...en,
      lang
    },
    pt: {
      ...pt,
      lang
    },
    de: {
      ...de,
      lang
    },
    cs: {
      ...cs,
      lang
    }
  }
}

export const { t, locale, locales, loading, loadTranslations, translations } = new i18n(config)

export const defaultLocale = 'pt'

// Translations logs
loading.subscribe(async ($loading) => {
  if ($loading) {
    console.log('Loading translations...')

    await loading.toPromise()
    console.log('Updated translations', translations.get())
  }
})
