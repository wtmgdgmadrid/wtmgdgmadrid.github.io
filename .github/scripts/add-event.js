#!/usr/bin/env node
// .github/scripts/add-event.js
// Parses a GitHub Issue body (or workflow_dispatch inputs) and appends the new
// event to src/data/events.json, then writes GitHub Actions step outputs.

import { readFileSync, writeFileSync, appendFileSync } from 'fs';
import { resolve } from 'path';

// ---------------------------------------------------------------------------
// Environment
// ---------------------------------------------------------------------------

const ISSUE_BODY = process.env.ISSUE_BODY ?? '';
const EVENT_NAME = process.env.EVENT_NAME ?? '';
const GITHUB_OUTPUT = process.env.GITHUB_OUTPUT ?? '';

// workflow_dispatch inputs
const INPUT_TITLE = process.env.INPUT_TITLE ?? '';
const INPUT_STATUS = process.env.INPUT_STATUS ?? '';
const INPUT_DATE = process.env.INPUT_DATE ?? '';
const INPUT_TIME = process.env.INPUT_TIME ?? '';
const INPUT_LOCATION = process.env.INPUT_LOCATION ?? '';
const INPUT_URL = process.env.INPUT_URL ?? '';
const INPUT_CTA_LABEL = process.env.INPUT_CTA_LABEL ?? '';

// ---------------------------------------------------------------------------
// Issue body parser
// ---------------------------------------------------------------------------

/**
 * Parses a GitHub issue form body into a flat object.
 * Sections are delimited by "### Heading" markers.
 */
function parseIssueBody(body) {
  const fieldMap = {
    'Título del evento': 'title',
    'Estado de las inscripciones': 'status',
    'Fecha del evento': 'date',
    Horario: 'time',
    Lugar: 'location',
    'URL del evento': 'url',
    'Texto del botón CTA': 'ctaLabel',
  };

  const result = {};
  for (const section of body.split(/^### /m)) {
    const lines = section.trim().split('\n');
    const key = fieldMap[lines[0]?.trim()];
    if (!key) continue;
    const value = lines.slice(1).join('\n').trim();
    result[key] = value === '_No response_' ? '' : value;
  }
  return result;
}

// ---------------------------------------------------------------------------
// Date helpers
// ---------------------------------------------------------------------------

const MONTHS_ES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
];

/** Converts YYYY-MM-DD → "D de Mes YYYY". Falls back to the raw string. */
function toSpanishDate(iso) {
  const m = iso.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return iso;
  return `${parseInt(m[3], 10)} de ${MONTHS_ES[parseInt(m[2], 10) - 1]} ${m[1]}`;
}

/** Creates a URL-safe branch slug from a title. */
function toBranchSlug(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 50);
}

// ---------------------------------------------------------------------------
// GitHub Actions output
// ---------------------------------------------------------------------------

function setOutput(name, value) {
  if (GITHUB_OUTPUT) {
    appendFileSync(GITHUB_OUTPUT, `${name}=${value}\n`);
  }
  console.log(`  ${name}=${value}`);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main() {
  let title, status, date, time, location, url, ctaLabel;

  if (EVENT_NAME === 'workflow_dispatch') {
    title = INPUT_TITLE;
    status = INPUT_STATUS;
    date = INPUT_DATE;
    time = INPUT_TIME;
    location = INPUT_LOCATION;
    url = INPUT_URL;
    ctaLabel = INPUT_CTA_LABEL || 'Registrarse';
  } else {
    const parsed = parseIssueBody(ISSUE_BODY);
    title = parsed.title ?? '';
    status = parsed.status ?? '';
    date = parsed.date ?? '';
    time = parsed.time ?? '';
    location = parsed.location ?? '';
    url = parsed.url ?? '';
    ctaLabel = parsed.ctaLabel || 'Registrarse';
  }

  // Validate
  const missing = Object.entries({ title, status, date, time, location, url })
    .filter(([, v]) => !v?.trim())
    .map(([k]) => k);

  if (missing.length > 0) {
    console.error(`ERROR: Missing required fields: ${missing.join(', ')}`);
    process.exit(1);
  }

  const dateEs = toSpanishDate(date.trim());

  const event = {
    title: title.trim(),
    status: status.trim(),
    date: dateEs,
    time: time.trim(),
    location: location.trim(),
    ctaLabel: ctaLabel.trim(),
    url: url.trim(),
  };

  console.log('\nNew event:\n', JSON.stringify(event, null, 2));

  // Write events.json
  const eventsPath = resolve('src/data/events.json');
  const events = JSON.parse(readFileSync(eventsPath, 'utf-8'));
  events.push(event);
  writeFileSync(eventsPath, JSON.stringify(events, null, 2) + '\n');
  console.log(`\nevents.json updated — total events: ${events.length}`);

  // Set step outputs
  console.log('\nOutputs:');
  setOutput('branch_slug', toBranchSlug(title));
  setOutput('event_title', title.trim());
  setOutput('event_date_es', dateEs);
  setOutput('event_time', time.trim());
  setOutput('event_location', location.trim());
  setOutput('event_url', url.trim());
}

main();
