import { useTranslations, type Lang } from '~/i18n/utils';

function prefix(lang: Lang): string {
  return lang === 'en' ? '/en' : '';
}

export function getHeaderData(lang: Lang = 'es') {
  const t = useTranslations(lang);
  const p = prefix(lang);
  return {
    links: [
      { text: t('nav.iwd'), href: '/iwd' },
      { text: t('nav.about'), href: `${p}/#nosotras` },
      { text: t('nav.team'), href: `${p}/#team` },
      { text: t('nav.events'), href: `${p}/#eventos` },
      { text: t('nav.partners'), href: `${p}/#partners` },
      { text: t('nav.sponsors'), href: `${p}/#sponsors-who` },
      { text: t('nav.contact'), href: `${p}/#contactos` },
    ],
  };
}

export function getFooterData(lang: Lang = 'es') {
  const t = useTranslations(lang);
  const p = prefix(lang);
  return {
    links: [
      { text: t('footer.home'), href: `${p === '' ? '' : p}/#top` },
      { text: t('footer.events'), href: `${p}/#eventos` },
      { text: t('footer.coc'), href: '/codigo-de-conducta' },
    ],
    socialLinks: [
      { ariaLabel: 'Email', icon: 'tabler:mail', href: 'mailto:womentechmakersmadrid@gmail.com' },
      { ariaLabel: 'X', icon: 'tabler:brand-x', href: 'https://x.com/WTMMadrid' },
      { ariaLabel: 'Instagram', icon: 'tabler:brand-instagram', href: 'https://www.instagram.com/wtmmadrid/' },
      { ariaLabel: 'LinkedIn', icon: 'tabler:brand-linkedin', href: 'https://www.linkedin.com/in/wtmmadrid/' },
    ],
    footNote: t('footer.copyright'),
  };
}

// Backward-compatible exports (used by LayoutIwd.astro and other layouts)
export const headerData = getHeaderData('es');
export const footerData = getFooterData('es');
