#!/usr/bin/env node
// Pulls the public game list from games.resuhive.com and rewrites README.md.
// Writes nothing when the content is unchanged, so the daily workflow only commits real updates.
//   node scripts/update.mjs                  # fetch https://games.resuhive.com/games.json
//   node scripts/update.mjs --input x.json   # local copy

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { parseArgs } from 'node:util';

const SOURCE = 'https://games.resuhive.com/games.json';
const UTM = 'utm_source=github&utm_medium=readme&utm_campaign=roblox-game-codes';

const { values } = parseArgs({ options: { input: { type: 'string' } } });
const data = values.input
  ? JSON.parse(readFileSync(values.input, 'utf8'))
  : await (await fetch(SOURCE, { signal: AbortSignal.timeout(30_000) })).json();

if (!Array.isArray(data.games) || data.games.length === 0) throw new Error('empty game list');

const link = (url, content) => `[${content}](${url}${url.includes('?') ? '&' : '?'}${UTM}&utm_content=${content.toLowerCase().replace(/[^a-z0-9]+/g, '-')})`;
const num = (n) => (n == null ? '—' : n >= 1e9 ? `${(n / 1e9).toFixed(1)}B` : n >= 1e6 ? `${(n / 1e6).toFixed(1)}M` : n >= 1e3 ? `${(n / 1e3).toFixed(1)}K` : String(n));
const cell = (s) => String(s).replace(/\|/g, '\\|').replace(/\n/g, ' ');
const day = (iso) => new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
const LABEL = { codes: 'Codes', endings: 'All endings', guide: 'Guide', badges: 'Badges' };

const games = [...data.games].sort((a, b) => (b.playing ?? 0) - (a.playing ?? 0));
const statsDay = data.statsAt.slice(0, 10);

const overview = games.map((g, i) => {
  const pages = Object.entries(g.pages).filter(([k]) => k !== 'overview').map(([k, url]) => link(url, LABEL[k] ?? k)).join(' · ') || '—';
  const codes = g.codesChecked == null ? '—' : g.codes.length ? `**${g.codes.length} working**` : 'None yet';
  return `| ${i + 1} | ${link(g.pages.overview, cell(g.name))} | ${num(g.playing)} | ${num(g.visits)} | ${codes} | ${pages} |`;
});

const codeSections = games.filter((g) => g.codesChecked != null).map((g) => {
  const head = `### ${g.name} codes\n\nChecked ${day(g.codesChecked)} · ${link(g.pages.codes, 'How to redeem and expired codes')}\n`;
  if (!g.codes.length) return `${head}\nNo working codes yet. The page above lists where we looked.\n`;
  const rows = g.codes.map((c) => `| \`${cell(c.code)}\` | ${cell(c.reward)}${c.note ? ` (${cell(c.note)})` : ''} |`);
  return `${head}\n| Code | Reward |\n| --- | --- |\n${rows.join('\n')}\n`;
});

const guideSections = games.filter((g) => g.guides.length).map((g) =>
  `### ${g.name}\n\n${g.guides.map((x) => link(x.url, cell(x.name))).join(' · ')}\n`);

const readme = `# Roblox Game Codes & Guides

Working codes, endings and guides for new and trending Roblox games. Every code is checked by hand, and each game shows the date of the last check. Updated daily.

Full guides with screenshots and videos: ${link(data.site, 'games.resuhive.com')}

**${games.length} games** · player counts from Roblox on ${day(statsDay)}

## Contents

- [All games](#all-games)
- [Working codes](#working-codes)
- [More guides](#more-guides)
- [How this list works](#how-this-list-works)

## All games

Sorted by players online right now.

| # | Game | Playing | Visits | Codes | Guides |
| --: | --- | --: | --: | --- | --- |
${overview.join('\n')}

## Working codes

Codes are case-sensitive. Copy them exactly, including spaces.

${codeSections.join('\n')}
## More guides

${guideSections.join('\n') || 'Coming soon.\n'}
## How this list works

- A code is listed as working only after we confirm it from the game page, the developer's channels or two separate sources.
- Games with no codes say "None yet" instead of guessing.
- A GitHub Action rebuilds this README every day from ${link(data.site, 'the site')}'s data.

Spotted a new code or a dead one? [Open an issue](../../issues/new).

## License

Code: MIT. Table content may be quoted or linked with attribution to ${link(data.site, 'games.resuhive.com')}.
`;

const old = existsSync('README.md') ? readFileSync('README.md', 'utf8') : '';
if (old === readme) console.log('README.md unchanged');
else { writeFileSync('README.md', readme); console.log('README.md updated'); }
