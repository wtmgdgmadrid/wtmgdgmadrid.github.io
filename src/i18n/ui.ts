export const languages = {
  es: 'Español',
  en: 'English',
} as const;

export const defaultLang = 'es' as const;

export const ui = {
  es: {
    // Navigation
    'nav.iwd': 'IWD 2026 🚀',
    'nav.about': 'Nosotras',
    'nav.team': 'Equipo',
    'nav.events': 'Eventos',
    'nav.partners': 'Comunidades Amigas',
    'nav.sponsors': 'Sponsors',
    'nav.contact': 'Contacto',
    // Footer
    'footer.home': 'Inicio',
    'footer.events': 'Eventos',
    'footer.coc': 'Código de conducta',
    'footer.copyright': '© 2025 Women Techmakers Madrid. Todos los derechos reservados.',
    // Events component
    'events.upcoming': 'Eventos Próximos',
    'events.subtitle':
      'No te pierdas nuestras próximas citas. Te esperamos en eventos diseñados para inspirar, formar y conectar a la comunidad de mujeres en tecnología.',
    'events.closed': 'Inscripciones cerradas',
    'events.register': 'Registrarse',
    'events.soldOut': 'Agotado',
    // Language picker
    'lang.label': 'EN',
    'lang.switchTo': 'Switch to English',
  },
  en: {
    // Navigation
    'nav.iwd': 'IWD 2026 🚀',
    'nav.about': 'About Us',
    'nav.team': 'Team',
    'nav.events': 'Events',
    'nav.partners': 'Partner Communities',
    'nav.sponsors': 'Sponsors',
    'nav.contact': 'Contact',
    // Footer
    'footer.home': 'Home',
    'footer.events': 'Events',
    'footer.coc': 'Code of Conduct',
    'footer.copyright': '© 2025 Women Techmakers Madrid. All rights reserved.',
    // Events component
    'events.upcoming': 'Upcoming Events',
    'events.subtitle':
      "Don't miss our next gatherings. Join us at events designed to inspire, educate and connect women in tech.",
    'events.closed': 'Registration closed',
    'events.register': 'Register',
    'events.soldOut': 'Sold Out',
    // Language picker
    'lang.label': 'ES',
    'lang.switchTo': 'Cambiar a Español',
  },
} as const;

export type Lang = keyof typeof ui;
export type UIKey = keyof (typeof ui)[typeof defaultLang];
