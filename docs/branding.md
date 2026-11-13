# Branding: Merge Generations

Identidad de marca, paleta, tipografías, tono de voz y reglas de uso del logo.

Fuente: _Merge Generations Brand Book · Guía de uso_ (WTM-brand.pdf, actualizado el 9 nov 2026).
Evento: viernes 11 de diciembre · 16:00 – 20:30 h · ETSII · UPM, Madrid. Organizan Women Techmakers Madrid y Technovation Girls Madrid.

## Identidad

Merge Generations junta a dos generaciones de mujeres en tecnología en una tarde de charlas, speed mentoring y networking (7 charlas · networking).

La identidad se apoya en dos voces que se fusionan:

- Una **serif itálica**, humana y cercana, encima de
- una **grotesca negra y apretada**, técnica y directa.

Todo lo demás está al servicio de ese par.

## Logos

Los cuatro organizadores aparecen **siempre juntos, en este orden y sobre blanco**:

| Posición    | Organizador                        |
| ----------- | ---------------------------------- |
| 1 (primero) | Women Techmakers Madrid            |
| 2           | Power to Code · Technovation Girls |
| 3           | Alumnae Power to Code              |
| 4 (último)  | Industriales ETSII · UPM           |

Reglas:

- Fondo siempre **blanco** (`#FFFFFF`); el blanco sostiene los logos.
- En piezas cuadradas y verticales van en una **franja inferior**; en banners horizontales, en una **columna a la derecha**.
- Los archivos del repo son versiones recortadas, válidas para pantalla. Para impresión, pedir el vectorial a cada organización.
- Rótulo de las dos comunidades: pills `WTM MADRID ⟷ TECHNOVATION GIRLS`.

En el repo: `public/images/merge/` (el logo de WTM es `wtm.png`, sin fondo) y `src/components/widgets/MergeBanner.astro`.

## Color

### Principales

| Nombre           | HEX       | RGB           | CMYK          | Uso                                                  |
| ---------------- | --------- | ------------- | ------------- | ---------------------------------------------------- |
| Navy Generations | `#1C1650` | 28, 22, 80    | 65, 72, 0, 69 | Fondo principal. Fondo de casi todas las piezas.     |
| Lima Merge       | `#DFEB9A` | 223, 235, 154 | 5, 0, 34, 8   | Acento: script, pill rellena, botón, fila destacada. |

El navy domina; el lima marca lo que hay que leer o pulsar primero y nunca pasa de acento.

### Apoyo

| Nombre     | HEX       | RGB           | CMYK         | Uso                                                   |
| ---------- | --------- | ------------- | ------------ | ----------------------------------------------------- |
| Azul Cielo | `#BCD6F7` | 188, 214, 247 | 24, 13, 0, 3 | Datos secundarios: lugar, formato, ponente · empresa. |
| Lavanda    | `#E4E1F3` | 228, 225, 243 | 6, 7, 0, 5   | Cuerpo de texto largo sobre navy.                     |
| Coral      | `#E89698` | 232, 150, 152 | 0, 35, 34, 9 | Puntual: una sola etiqueta de fecha u hora por pieza. |

### Fondos

| Nombre | HEX       | RGB           | CMYK          | Uso                                               |
| ------ | --------- | ------------- | ------------- | ------------------------------------------------- |
| Crema  | `#F9F4ED` | 249, 244, 237 | 0, 2, 5, 2    | Fondo claro de webs, documentos y presentaciones. |
| Blanco | `#FFFFFF` | 255, 255, 255 | 0, 0, 0, 0    | Franja de logos y tarjetas sobre crema.           |
| Cuerpo | `#4A4570` | 74, 69, 112   | 34, 38, 0, 56 | Texto de cuerpo sobre crema y blanco.             |

En webs: fondo crema, tarjetas blancas encima y texto en navy.

Los valores CMYK son una conversión directa desde RGB. Para imprimir, pedir a la imprenta la referencia Pantone más cercana y aprobar una prueba de color.

### Proporción (piezas para redes)

Navy 60 % · Blanco 15 % · Lima 12 % · Azul cielo 9 %. El coral es solo una etiqueta puntual.

### Contraste (WCAG)

| Texto sobre fondo                      | Ratio  | Nivel   |
| -------------------------------------- | ------ | ------- |
| Titulares (blanco / navy)              | 16.4:1 | AAA     |
| Script y acentos (lima / navy)         | 12.9:1 | AAA     |
| Datos secundarios (azul cielo / navy)  | 11.0:1 | AAA     |
| Inscripciones (navy / lima)            | 12.9:1 | AAA     |
| Etiqueta de fecha (navy / coral)       | 7.2:1  | AAA     |
| Web y documentos (navy / crema)        | 15.0:1 | AAA     |
| Cuerpo sobre crema (`#4A4570` / crema) | 8.1:1  | AAA     |
| **No usar:** lima sobre azul cielo     | 1.2:1  | No pasa |

## Tipografía

Tres familias, cada una con un papel fijo. Son las alternativas de Google Fonts más cercanas a las de las piezas; si se usa el kit tipográfico original de WTM, lo sustituye.

| Rol     | Familia                  | Uso                               | Notas                                                                         |
| ------- | ------------------------ | --------------------------------- | ----------------------------------------------------------------------------- |
| Script  | Instrument Serif itálica | Nombre del evento, gancho, cifras | Siempre encima del titular, alineada a su izquierda y a un 55 % de su tamaño. |
| Display | Inter Tight 800          | Titulares                         | Tracking −0,045 em, interlineado 0,9.                                         |
| Texto   | Inter 400 – 800          | Datos, cuerpo, botones            | Etiquetas y botones en mayúsculas 800.                                        |

Escala de referencia en piezas para redes:

- Display: 160 px (ej. "Speed Mentoring")
- Script: 88 px (ej. "Se buscan mentees")
- Fecha: 28 px, peso 800
- Cuerpo: 22 px, peso 500
- Etiqueta: 14 px, peso 800, mayúsculas

## Voz

Directa y cálida. Frases cortas que dicen qué es y qué ganas.

- **Idioma, bilingüe con criterio:** los formatos en inglés, como los usa la comunidad (_Save the Date_, _Speed Mentoring_, _Break & networking_). Lo práctico, en español.
- **Datos, limpios:** punto medio para separar y guion medio para rangos: `ETSII · UPM`, `16:00 – 20:30 h`.
- **Fechas, según el tamaño:** larga en piezas grandes (`Viernes 11 de diciembre`); corta en pequeñas (`Vie 11 dic` o `11.12`).

Ejemplo:

- **Así:** "4 rondas de 15 minutos para resolver dudas, pedir consejo y ampliar tu red."
- **Así no:** "Te invitamos a participar en una enriquecedora experiencia de networking intergeneracional."

## Piezas

Composición base: **pills de organizadoras arriba, par script + titular en el centro, fecha o CTA abajo.**

- Tres piezas para redes, en navy o lima: _Save the Date_, _Inscripciones abiertas_ (CTA "Inscríbete →") y _Speed Mentoring_ (CTA "Mentees →").
- Una versión crema para webs y documentos (ej. "Guía para ponentes").

## Aplicación en este repositorio

| Qué                          | Dónde                                                                                                                                                       |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Variables de color y fuentes | `src/components/CustomStyles.astro` (`--aw-color-navy`, `--aw-color-lime`, `--aw-color-sky`, `--aw-color-lavender`, `--aw-color-cream`, `--aw-color-coral`) |
| Clase de la script           | `.font-script` en `CustomStyles.astro`                                                                                                                      |
| Titulares                    | `h1`, `h2`, `h3` globales en `CustomStyles.astro`                                                                                                           |
| Banner Save the Date         | `src/components/widgets/MergeBanner.astro`                                                                                                                  |
| Bloque de eventos con navy   | `.merge-brand` en `src/pages/index.astro`                                                                                                                   |
| Fuentes instaladas           | `@fontsource-variable/inter`, `@fontsource-variable/inter-tight`, `@fontsource/instrument-serif`                                                            |

Pendiente respecto al brand book: los titulares usan interlineado 1 y el PDF indica 0,9; el coral está definido pero aún no se usa.
