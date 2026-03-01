#!/usr/bin/env node
// .github/scripts/add-event.js
// Reads event data from environment variables, appends to src/data/events.json,
// and writes step outputs to $GITHUB_OUTPUT.
// No external dependencies — uses only Node.js built-ins.

import { readFileSync, writeFileSync, appendFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, '../../');
const EVENTS_PATH = resolve(REPO_ROOT, 'src/data/events.json');
const GITHUB_OUTPUT = process.env.GITHUB_OUTPUT;

// ---------------------------------------------------------------------------
// Spanish month names — must match the capitalisation used by parseSpanishDate
// in src/utils/dates.ts so that isPastEvent() works correctly on the frontend.
// ---------------------------------------------------------------------------
const SPANISH_MONTHS = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];

/**
 * Converts an ISO date string (YYYY-MM-DD) to the Spanish long format used by
 * the website: "DD de MesCapitalizado YYYY", e.g. "2026-03-21" -> "21 de Marzo 2026".
 *
 * Uses string splitting rather than new Date() to avoid UTC/local timezone
 * offset issues that can shift the day by one.
 */
function isoToSpanish(isoDate) {
  const trimmed = isoDate.trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
    const [year, month, day] = trimmed.split('-').map(Number);
    const monthName = SPANISH_MONTHS[month - 1];
    if (!monthName) throw new Error(`Invalid month in date: ${isoDate}`);
    return `${day} de ${monthName} ${year}`;
  }
  // If it already looks like a Spanish date, pass through unchanged.
  if (/^\d{1,2} de [a-zA-Z]+ \d{4}$/.test(trimmed)) {
    return trimmed;
  }
  throw new Error(`Unrecognised date format: "${isoDate}". Expected YYYY-MM-DD or "DD de Mes YYYY".`);
}

/**
 * Parses a GitHub issue form body (Markdown) into a key-value map.
 * GitHub renders form submissions with H3 headings for each field label,
 * followed by the field value on subsequent lines.
 */
function parseIssueBody(body) {
  const text = body.replace(/\r\n/g, '\n');

  // Split into sections on H3 headings
  const sections = text.split(/\n(?=### )/);

  const fieldMap = {
    'Título del evento': 'title',
    'Estado de las inscripciones': 'status',
    'Fecha del evento': 'date',
    Horario: 'time',
    Lugar: 'location',
    'URL del evento': 'url',
    'Texto del botón CTA': 'cta_label',
  };

  const result = {};
  for (const section of sections) {
    const lines = section.trim().split('\n');
    if (!lines[0].startsWith('### ')) continue;
    const heading = lines[0].replace(/^### /, '').trim();
    const key = fieldMap[heading];
    if (!key) continue;
    // GitHub uses "_No response_" for optional empty fields.
    const value = lines.slice(1).join('\n').trim();
    result[key] = value === '_No response_' ? '' : value;
  }

  return result;
}

/**
 * Creates a URL-safe branch slug from a title and ISO date.
 * e.g. ("2026-03-21", "Mi Gran Evento!") -> "2026-03-21-mi-gran-evento"
 */
function branchSlug(isoDate, title) {
  const datePrefix = isoDate.trim().slice(0, 10);
  const titleSlug = title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // strip diacritics
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 50);
  return `${datePrefix}-${titleSlug}`;
}

/**
 * Writes a key=value pair to the GITHUB_OUTPUT file.
 * Values containing newlines use the multiline delimiter syntax.
 */
function setOutput(name, value) {
  if (!GITHUB_OUTPUT) return; // local testing guard
  const str = String(value);
  if (str.includes('\n')) {
    const delimiter = `ghadelimiter_${Date.now()}`;
    appendFileSync(GITHUB_OUTPUT, `${name}<<${delimiter}\n${str}\n${delimiter}\n`);
  } else {
    appendFileSync(GITHUB_OUTPUT, `${name}=${str}\n`);
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

const eventName = process.env.EVENT_NAME;

let rawTitle, rawStatus, rawDate, rawTime, rawLocation, rawUrl, rawCtaLabel;

if (eventName === 'issues') {
  const issueBody = process.env.ISSUE_BODY;
  if (!issueBody) {
    console.error('ERROR: ISSUE_BODY environment variable is empty.');
    process.exit(1);
  }
  const parsed = parseIssueBody(issueBody);
  rawTitle = parsed.title;
  rawStatus = parsed.status;
  rawDate = parsed.date;
  rawTime = parsed.time;
  rawLocation = parsed.location;
  rawUrl = parsed.url;
  rawCtaLabel = parsed.cta_label;
} else {
  // workflow_dispatch: read inputs directly from environment variables
  rawTitle = process.env.INPUT_TITLE;
  rawStatus = process.env.INPUT_STATUS;
  rawDate = process.env.INPUT_DATE;
  rawTime = process.env.INPUT_TIME;
  rawLocation = process.env.INPUT_LOCATION;
  rawUrl = process.env.INPUT_URL;
  rawCtaLabel = process.env.INPUT_CTA_LABEL;
}

// Validate required fields
const required = { title: rawTitle, status: rawStatus, date: rawDate, time: rawTime, location: rawLocation, url: rawUrl };
for (const [field, value] of Object.entries(required)) {
  if (!value || !value.trim()) {
    console.error(`ERROR: Required field "${field}" is missing or empty.`);
    process.exit(1);
  }
}

// Convert date to Spanish format
const dateEs = isoToSpanish(rawDate.trim());

// Resolve CTA label: use provided value, or fall back to "Registrarse"
const ctaLabel = rawCtaLabel && rawCtaLabel.trim() ? rawCtaLabel.trim() : 'Registrarse';

// Build the new event object (field order matches existing entries in events.json)
const newEvent = {
  title: rawTitle.trim(),
  status: rawStatus.trim(),
  date: dateEs,
  time: rawTime.trim(),
  location: rawLocation.trim(),
  ctaLabel,
  url: rawUrl.trim(),
};

console.log('New event to add:', JSON.stringify(newEvent, null, 2));

// Read existing events, append, and write back
const existing = JSON.parse(readFileSync(EVENTS_PATH, 'utf8'));
existing.push(newEvent);
// Prettier will do the final formatting pass; this keeps the file valid JSON in the meantime.
writeFileSync(EVENTS_PATH, JSON.stringify(existing, null, 2) + '\n', 'utf8');

console.log(`Successfully wrote ${existing.length} events to ${EVENTS_PATH}`);

// Write outputs for subsequent workflow steps
const isoDateForSlug = rawDate.trim().slice(0, 10);
setOutput('branch_slug', branchSlug(isoDateForSlug, rawTitle.trim()));
setOutput('event_title', newEvent.title);
setOutput('event_date_es', newEvent.date);
setOutput('event_time', newEvent.time);
setOutput('event_location', newEvent.location);
setOutput('event_url', newEvent.url);
