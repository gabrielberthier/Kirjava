import i18n from 'sveltekit-i18n'
import type { Config } from 'sveltekit-i18n'
import en from './en-US'
import lang from './lang.json'
import pt from './pt-BR'

const config: Config = {
  translations: {
    "en-US": {
      ...en,
      lang
    },
    "pt-BR": {
      ...pt,
      lang
    },
  }
}

export const { t, locale, locales, loading, loadTranslations, translations } = new i18n(config)

export const defaultLocale = 'pt-BR'

// Translations logs
loading.subscribe(async ($loading) => {
  if ($loading) {
    console.log('Loading translations...')

    await loading.toPromise()
    console.log('Updated translations', translations.get())
  }
})
