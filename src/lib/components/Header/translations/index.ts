import i18n from 'sveltekit-i18n'
import type { Config } from 'sveltekit-i18n'
import lang from './lang.json'

export const config: Config = {
  loaders: [
    {
      locale: 'en-US',
      key: 'lang',
      loader: async () => lang
    },
    {
      locale: 'en-US',
      key: 'menu',
      loader: async () => (await import('./en-US/menu.json')).default
    },
    {
      locale: 'pt-BR',
      key: 'lang',
      loader: async () => lang
    },
    {
      locale: 'pt-BR',
      key: 'menu',
      loader: async () => (await import('./pt-BR/menu.json')).default
    }
  ]
}

export default () => new i18n(config)
