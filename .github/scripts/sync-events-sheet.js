#!/usr/bin/env node
// .github/scripts/sync-events-sheet.js
// Reads pending events from a Google Sheet and creates GitHub Issues with the
// 'evento' label so that add-event.yaml picks them up automatically.
// No external dependencies — uses only Node.js 18+ built-ins (crypto, fetch).

import { createSign } from 'crypto';

// ---------------------------------------------------------------------------
// Config from environment
// ---------------------------------------------------------------------------

const SERVICE_ACCOUNT_JSON = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
const SPREADSHEET_ID = process.env.SPREADSHEET_ID;
const SHEET_NAME = process.env.SHEET_NAME || 'Eventos';
const GH_TOKEN = process.env.GH_TOKEN;
const GH_REPO = process.env.GH_REPO; // e.g. "org/repo"
const DRY_RUN = process.env.DRY_RUN === 'true';

// Column indices (0-based) — must match the sheet header row
const COL = {
  title: 0,
  status: 1,
  date: 2,
  time: 3,
  location: 4,
  url: 5,
  cta: 6,
  processed: 7,
};

// ---------------------------------------------------------------------------
// Validate required env vars
// ---------------------------------------------------------------------------

if (!SERVICE_ACCOUNT_JSON) {
  console.error('ERROR: GOOGLE_SERVICE_ACCOUNT_JSON secret is not set.');
  process.exit(1);
}
if (!SPREADSHEET_ID) {
  console.error('ERROR: SPREADSHEET_ID secret/input is not set.');
  process.exit(1);
}
if (!GH_TOKEN) {
  console.error('ERROR: GH_TOKEN is not set.');
  process.exit(1);
}
if (!GH_REPO) {
  console.error('ERROR: GH_REPO is not set.');
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Google OAuth2 — JWT Service Account flow (no external deps)
// ---------------------------------------------------------------------------

function buildJWT(sa) {
  const now = Math.floor(Date.now() / 1000);
  const header = Buffer.from(JSON.stringify({ alg: 'RS256', typ: 'JWT' })).toString('base64url');
  const payload = Buffer.from(
    JSON.stringify({
      iss: sa.client_email,
      scope: 'https://www.googleapis.com/auth/spreadsheets',
      aud: 'https://oauth2.googleapis.com/token',
      exp: now + 3600,
      iat: now,
    }),
  ).toString('base64url');

  const toSign = `${header}.${payload}`;
  const sign = createSign('RSA-SHA256');
  sign.update(toSign);
  const signature = sign.sign(sa.private_key, 'base64url');

  return `${toSign}.${signature}`;
}

async function getAccessToken(sa) {
  const jwt = buildJWT(sa);
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Google token exchange failed (${res.status}): ${body}`);
  }

  const { access_token } = await res.json();
  return access_token;
}

// ---------------------------------------------------------------------------
// Google Sheets API helpers
// ---------------------------------------------------------------------------

async function readSheet(token, spreadsheetId, sheetName) {
  const range = encodeURIComponent(`${sheetName}!A:H`);
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}`;

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Sheets API read failed (${res.status}): ${body}`);
  }

  const { values } = await res.json();
  return values || [];
}

async function markRowProcessed(token, spreadsheetId, sheetName, rowNumber) {
  // rowNumber is 1-based (spreadsheet rows)
  const range = encodeURIComponent(`${sheetName}!H${rowNumber}`);
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?valueInputOption=RAW`;
  const today = new Date().toISOString().slice(0, 10);

  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ values: [[today]] }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Sheets API write failed for row ${rowNumber} (${res.status}): ${body}`);
  }
}

// ---------------------------------------------------------------------------
// GitHub Issues API helper
// ---------------------------------------------------------------------------

/**
 * Builds the Markdown issue body in the exact format that parseIssueBody()
 * in add-event.js expects (H3 headings matching the fieldMap keys).
 */
function buildIssueBody({ title, status, date, time, location, url, cta }) {
  const ctaLine = cta && cta.trim() ? cta.trim() : '_No response_';
  return [
    `### Título del evento`,
    ``,
    title.trim(),
    ``,
    `### Estado de las inscripciones`,
    ``,
    status.trim(),
    ``,
    `### Fecha del evento`,
    ``,
    date.trim(),
    ``,
    `### Horario`,
    ``,
    time.trim(),
    ``,
    `### Lugar`,
    ``,
    location.trim(),
    ``,
    `### URL del evento`,
    ``,
    url.trim(),
    ``,
    `### Texto del botón CTA`,
    ``,
    ctaLine,
  ].join('\n');
}

async function createGitHubIssue(event) {
  const body = buildIssueBody(event);
  const ghHeaders = {
    Authorization: `Bearer ${GH_TOKEN}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'Content-Type': 'application/json',
  };

  // Step 1: create the issue WITHOUT the label.
  // GitHub only fires the `issues: labeled` webhook event when a label is added
  // to an already-existing issue, NOT when labels are included in the creation
  // payload. Splitting into two calls ensures add-event.yaml is triggered.
  const createRes = await fetch(`https://api.github.com/repos/${GH_REPO}/issues`, {
    method: 'POST',
    headers: ghHeaders,
    body: JSON.stringify({ title: `[Evento] ${event.title.trim()}`, body }),
  });

  if (!createRes.ok) {
    const responseBody = await createRes.text();
    throw new Error(`GitHub Issues API (create) failed (${createRes.status}): ${responseBody}`);
  }

  const { html_url, number } = await createRes.json();

  // Step 2: add the 'evento' label — this fires `issues: labeled` and triggers add-event.yaml.
  const labelRes = await fetch(`https://api.github.com/repos/${GH_REPO}/issues/${number}/labels`, {
    method: 'POST',
    headers: ghHeaders,
    body: JSON.stringify({ labels: ['evento'] }),
  });

  if (!labelRes.ok) {
    const responseBody = await labelRes.text();
    throw new Error(`GitHub Issues API (label) failed (${labelRes.status}): ${responseBody}`);
  }

  return { html_url, number };
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  if (DRY_RUN) {
    console.log('--- DRY RUN MODE: no Issues will be created, no rows will be marked ---\n');
  }

  // Parse service account credentials
  let sa;
  try {
    sa = JSON.parse(SERVICE_ACCOUNT_JSON);
  } catch {
    console.error('ERROR: GOOGLE_SERVICE_ACCOUNT_JSON is not valid JSON.');
    process.exit(1);
  }

  console.log(`Authenticating as service account: ${sa.client_email}`);
  const accessToken = await getAccessToken(sa);
  console.log('OAuth2 token obtained.\n');

  // Read sheet rows
  console.log(`Reading sheet "${SHEET_NAME}" from spreadsheet ${SPREADSHEET_ID}...`);
  const rows = await readSheet(accessToken, SPREADSHEET_ID, SHEET_NAME);

  if (rows.length < 2) {
    console.log('Sheet is empty or has only the header row. Nothing to do.');
    return;
  }

  // Row 0 = headers, rows 1..N = data (spreadsheet row numbers start at 1)
  const dataRows = rows.slice(1);
  const pending = dataRows
    .map((row, idx) => ({ row, sheetRowNumber: idx + 2 })) // +2: 1-based + skip header
    .filter(({ row }) => {
      const processed = row[COL.processed];
      return !processed || !processed.trim();
    });

  console.log(`Total data rows: ${dataRows.length} | Pending (unprocessed): ${pending.length}\n`);

  if (pending.length === 0) {
    console.log('No new events to process.');
    return;
  }

  let created = 0;
  let failed = 0;

  for (const { row, sheetRowNumber } of pending) {
    const event = {
      title: row[COL.title] || '',
      status: row[COL.status] || '',
      date: row[COL.date] || '',
      time: row[COL.time] || '',
      location: row[COL.location] || '',
      url: row[COL.url] || '',
      cta: row[COL.cta] || '',
    };

    // Validate required fields
    const missing = ['title', 'status', 'date', 'time', 'location', 'url'].filter(
      (f) => !event[f] || !event[f].trim(),
    );

    if (missing.length > 0) {
      console.warn(`  Row ${sheetRowNumber}: skipping — missing required fields: ${missing.join(', ')}`);
      failed++;
      continue;
    }

    console.log(`  Row ${sheetRowNumber}: "${event.title}" (${event.date})`);

    if (DRY_RUN) {
      console.log('    [dry-run] Would create GitHub Issue with label "evento".');
      continue;
    }

    try {
      const issue = await createGitHubIssue(event);
      console.log(`    Issue #${issue.number} created: ${issue.html_url}`);

      await markRowProcessed(accessToken, SPREADSHEET_ID, SHEET_NAME, sheetRowNumber);
      console.log(`    Row ${sheetRowNumber} marked as processed in Sheet.`);

      created++;
    } catch (err) {
      console.error(`    ERROR processing row ${sheetRowNumber}: ${err.message}`);
      failed++;
    }
  }

  console.log(`\nDone. Issues created: ${created} | Skipped/failed: ${failed}`);
  if (failed > 0) process.exit(1);
}

main().catch((err) => {
  console.error('Fatal error:', err.message);
  process.exit(1);
});
