type Lang = 'es' | 'en';

export function getHeaderData(lang: Lang = 'es') {
  const base = lang === 'en' ? '/en' : '';
  return {
    links: [
      { text: 'Home', href: lang === 'en' ? '/en' : '/' },
      { text: 'Sponsors & Partners', href: `${base}/iwd#sponsors-partners` },
      { text: lang === 'en' ? 'Speakers' : 'Ponentes', href: `${base}/iwd#ponentes` },
      { text: 'Agenda', href: `${base}/iwd#agenda` },
    ],
  };
}

export function getFooterData(lang: Lang = 'es') {
  return {
    socialLinks: [
      { ariaLabel: 'Email', icon: 'tabler:mail', href: 'mailto:womentechmakersmadrid@gmail.com' },
      { ariaLabel: 'X', icon: 'tabler:brand-x', href: 'https://x.com/WTMMadrid' },
      { ariaLabel: 'Instagram', icon: 'tabler:brand-instagram', href: 'https://www.instagram.com/wtmmadrid/' },
      { ariaLabel: 'LinkedIn', icon: 'tabler:brand-linkedin', href: 'https://www.linkedin.com/in/wtmmadrid/' },
    ],
    footNote:
      lang === 'en'
        ? '© 2025 Women Techmakers Madrid. All rights reserved.'
        : '© 2025 Women Techmakers Madrid. Todos los derechos reservados.',
  };
}

// Backward-compatible exports for the Spanish IWD page
export const headerData = getHeaderData('es');
export const footerData = getFooterData('es');
