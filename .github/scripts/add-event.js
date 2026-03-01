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
