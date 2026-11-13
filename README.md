# AI Lead Engine

Multi-industry lead qualification dashboard built with Next.js.

## Local setup

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Features

- Industry selector and sample prospect data
- Buying-signal lead scoring and pipeline statuses
- API scaffold for AI qualification (requires `OPENAI_API_KEY` in environment)

**Important:** Leads in the demo are fictional. This app is a prototype, not a live prospect discovery system. Never commit secrets or personal customer data. Verify outreach permission and follow applicable law and platform rules.

## Deployment

Import the GitHub repository into Vercel. Framework: Next.js. Set `OPENAI_API_KEY` as a server-side environment variable only if enabling qualification. No API key is required for the sample dashboard.
