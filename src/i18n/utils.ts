import { ui, defaultLang, type Lang, type UIKey } from './ui';

export type { Lang };

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as Lang;
  return defaultLang;
}

export function useTranslations(lang: Lang) {
  return function t(key: UIKey): string {
    return ((ui[lang] as Record<string, string>)[key] ?? (ui[defaultLang] as Record<string, string>)[key]) as string;
  };
}

/** Returns the equivalent URL for the given locale.
 *  e.g. /en/blog → /blog (switching to 'es')
 *       /blog     → /en/blog (switching to 'en')
 */
export function getAlternateLocaleUrl(currentPath: string, targetLang: Lang): string {
  if (targetLang === defaultLang) {
    // Strip /en prefix
    return currentPath.replace(/^\/en(\/|$)/, '/') || '/';
  }
  // Add /en prefix (avoid double slash)
  const clean = currentPath === '/' ? '' : currentPath;
  return `/${targetLang}${clean}`;
}
