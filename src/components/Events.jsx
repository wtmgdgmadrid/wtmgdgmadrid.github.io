// Nota importante: Instagram no ofrece una URL de "share" pública desde web.
// Mostramos un botón que copia el enlace al portapapeles y, si el navegador
// soporta Web Share API, ofrece compartir nativo en móvil.
import React from 'react';
import { isPastEvent } from '../utils/dates';
import {
  LinkedinShareButton,
  TwitterShareButton,
  TelegramShareButton,
  LinkedinIcon,
  TelegramIcon,
  XIcon,
} from 'react-share';


function SocialShare({ url, title }) {
  return (
    <div className="flex gap-2">
      <LinkedinShareButton url={url} title={title} aria-label={`Compartir en LinkedIn: ${title}`}>
        <LinkedinIcon size={28} round />
      </LinkedinShareButton>
      <TwitterShareButton url={url} title={title} aria-label={`Compartir en X/Twitter: ${title}`}>
        <XIcon size={28} round />
      </TwitterShareButton>
      <TelegramShareButton url={url} title={title} aria-label={`Compartir en Telegram: ${title}`}>
        <TelegramIcon size={28} round />
      </TelegramShareButton>
    </div>
  );
}

export default function Events({ events }) {
  return (
    <section id='eventos' className="py-20 px-6">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-3xl font-extrabold text-bg-white">Eventos Próximos</h2>
        <p className="mt-4 text-lg text-bg-white/90 max-w-2xl mx-auto">
          No te pierdas nuestras próximas citas. Te esperamos en eventos diseñados para inspirar, formar y conectar a la
          comunidad de mujeres en tecnología.
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {events.map((e, idx) => {
          // Determina si el evento es pasado usando util
          const isPast = e.date ? isPastEvent(e.date) : false;
          return (
            <article
              key={`${e.title}-${idx}`}
              className="relative bg-white rounded-3xl p-8 shadow-sm ring-1 ring-black/5 hover:shadow-md transition flex flex-col justify-between h-full"
            >
              <div className="flex flex-col gap-2 flex-grow">
                <div className="flex items-center justify-between min-h-[40px]">
                  {e.status === "Inscripciones Abiertas" && (
                    <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-emerald-500 text-white text-sm font-semibold shadow-sm">
                      {e.status}
                    </span>
                  )}
                  {!isPast && <SocialShare url={e.url} title={e.title} />}
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
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(e.location)}`}
                        target="_blank"
                        rel="noopener"
                        className="text-pink-600 hover:underline"
                      >
                        {e.location}
                      </a>
                    </li>
                  )}
                </ul>
              </div>

              <div className="mt-8 flex-shrink-0">
                <div className={`p-1 rounded-full ring-2 ${isPast ? 'ring-gray-400/90' : 'ring-emerald-400/90'} min-h-[72px] flex items-center justify-center`}> 
                  <a
                    href={isPast ? undefined : e.url}
                    target="_blank"
                    rel="noopener"
                    className={`block w-full text-center rounded-full py-4 font-semibold transition ${isPast ? 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-70' : 'text-white bg-gradient-to-r from-emerald-400 via-teal-400 to-sky-500 hover:opacity-95 active:opacity-90'}`}
                    tabIndex={isPast ? -1 : 0}
                    aria-disabled={isPast ? 'true' : 'false'}
                    {...(isPast ? { onClick: e => e.preventDefault() } : {})}
                  >
                    {isPast ? 'Inscripciones cerradas' : (e.ctaLabel || 'Registrarse')}
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
