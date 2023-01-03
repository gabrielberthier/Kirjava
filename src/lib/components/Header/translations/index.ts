import i18n, { type Config } from 'sveltekit-i18n';
import lang from './lang.json';

export const config: Config = {
  loaders: [
    {
      locale: 'en',
      key: 'lang',
      loader: async () => lang,
    },
    {
      locale: 'en',
      key: 'menu',
      loader: async () => (await import('./en/menu.json')).default,
    },
    {
      locale: 'cs',
      key: 'lang',
      loader: async () => lang,
    },
    {
      locale: 'cs',
      key: 'menu',
      loader: async () => (await import('./cs/menu.json')).default,
    },
    {
      locale: 'de',
      key: 'lang',
      loader: async () => lang,
    },
    {
      locale: 'de',
      key: 'menu',
      loader: async () => (await import('./de/menu.json')).default,
    },
    {
      locale: 'pt',
      key: 'lang',
      loader: async () => lang,
    },
    {
      locale: 'pt',
      key: 'menu',
      loader: async () => (await import('./pt/menu.json')).default,
    },
  ],
};

export default () => new i18n(config);