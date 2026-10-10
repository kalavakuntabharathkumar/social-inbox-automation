# Social Inbox Automation Agent for Support Teams

A runnable Node.js portfolio project that normalizes Instagram/WhatsApp-style conversations, drafts responses, simulates six browser-only vendor portals, captures failure evidence, and stores run artifacts locally. Nango, social APIs, and Cloudflare R2 are integration boundaries; demo mode works without credentials.

## Requirements
- Node.js 20+
- Optional Docker
- Optional Playwright browser install for portal automation

## Quick start
```bash
cd social-inbox-automation
cp .env.example .env
npm install
npm run dev
```
Open http://localhost:3000.

## Playwright setup
```bash
npx playwright install chromium
npm run portals
```
Portal automation runs against a local demo page, not real vendor sites. Configure authorized URLs and credentials before adapting to real systems.

## Docker
```bash
docker compose up --build
```

## Design notes
- `src/providers.js`: mock provider adapters
- `src/agent.js`: response drafting and routing logic
- `src/server.js`: API and dashboard
- `scripts/portal-runner.js`: browser automation demo with screenshots
- `artifacts/`: local run evidence (created on demand)

Use only authorized APIs and browser sessions. Respect platform policies, rate limits, privacy rules, and user consent. Do not store access tokens in source control.
