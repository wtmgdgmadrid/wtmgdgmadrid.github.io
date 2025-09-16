// Nota importante: Instagram no ofrece una URL de "share" pública desde web.
// Mostramos un botón que copia el enlace al portapapeles y, si el navegador
// soporta Web Share API, ofrece compartir nativo en móvil.
import React, { useState } from 'react';
import {
  LinkedinShareButton,
  TwitterShareButton,
  TelegramShareButton,
  LinkedinIcon,
  TwitterIcon,
  TelegramIcon,
  XIcon,
} from 'react-share';

// Botón fallback para Instagram (copia enlace / Web Share API)
function InstagramShareFallback({ url, title }) {
  const [copied, setCopied] = useState(false);
  const handleClick = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        alert('No se pudo compartir ni copiar el enlace.');
      }
    }
  };
  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Compartir en Instagram (copiar enlace)"
      className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/90 text-pink-600 shadow ring-1 ring-black/5 hover:bg-pink-600 hover:text-white transition"
      title={copied ? '¡Copiado!' : 'Instagram (copiar enlace)'}
    >
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden>
        <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm10 2H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zm-5 3.5A5.5 5.5 0 1 1 6.5 13 5.51 5.51 0 0 1 12 7.5zm0 2A3.5 3.5 0 1 0 15.5 13 3.5 3.5 0 0 0 12 9.5zM17.8 6.2a1 1 0 1 1-1.6 1.2 1 1 0 0 1 1.6-1.2z" />
      </svg>
      <span className="sr-only">Instagram</span>
    </button>
  );
}

function SocialShare({ url, title }) {
  return (
    <div className="absolute top-3 right-3 flex gap-2">
      <LinkedinShareButton url={url} title={title} aria-label={`Compartir en LinkedIn: ${title}`}>
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>
      <TwitterShareButton url={url} title={title} aria-label={`Compartir en X/Twitter: ${title}`}>
        <XIcon size={32} round />
      </TwitterShareButton>
      <TelegramShareButton url={url} title={title} aria-label={`Compartir en Telegram: ${title}`}>
        <TelegramIcon size={32} round />
      </TelegramShareButton>
    </div>
  );
}

export default function Events({ events }) {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-3xl font-extrabold text-bg-white">Eventos Próximos</h2>
        <p className="mt-4 text-lg text-bg-white/90 max-w-2xl mx-auto">
          No te pierdas nuestras próximas citas. Te esperamos en eventos diseñados para inspirar, formar y conectar a la
          comunidad de mujeres en tecnología.
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {events.map((e, idx) => (
          <article
            key={`${e.title}-${idx}`}
            className="relative bg-white rounded-3xl p-8 shadow-sm ring-1 ring-black/5 hover:shadow-md transition"
          >
            <SocialShare url={e.url} title={e.title} />

            <div className="flex items-center justify-between">
              {e.status && (
                <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-emerald-500 text-white text-sm font-semibold shadow-sm">
                  {e.status}
                </span>
              )}
            </div>

            <h3 className="mt-5 text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-900">{e.title}</h3>

            <ul className="mt-6 space-y-5 text-[1.125rem] text-slate-600">
              {e.date && (
                <li className="flex items-center gap-3">
                  <svg
                    className="w-6 h-6 text-emerald-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 7V3m8 4V3M5 8h14M5 21h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v11a2 2 0 002 2z"
                    />
                  </svg>
                  <span>{e.date}</span>
                </li>
              )}
              {e.time && (
                <li className="flex items-center gap-3">
                  <svg
                    className="w-6 h-6 text-sky-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 8v4l3 3M12 22a10 10 0 100-20 10 10 0 000 20z"
                    />
                  </svg>
                  <span>{e.time}</span>
                </li>
              )}
              {e.location && (
                <li className="flex items-center gap-3">
                  <svg
                    className="w-6 h-6 text-pink-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 11a3 3 0 100-6 3 3 0 000 6z" />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 5.25-7.5 10.5-7.5 10.5S4.5 15.75 4.5 10.5a7.5 7.5 0 1115 0z"
                    />
                  </svg>
                  <span>{e.location}</span>
                </li>
              )}
            </ul>

            <div className="mt-8">
              <div className="p-1 rounded-full ring-2 ring-emerald-400/90">
                <a
                  href={e.url}
                  target="_blank"
                  rel="noopener"
                  className="block w-full text-center rounded-full py-4 font-semibold text-white bg-gradient-to-r from-emerald-400 via-teal-400 to-sky-500 hover:opacity-95 active:opacity-90 transition"
                >
                  {e.ctaLabel || 'Registrarse'}
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
