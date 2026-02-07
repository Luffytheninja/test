# T-Axed: iOS PWA for Nigerian Tax & Insurance

A modern, iOS-inspired PWA for Nigerian professionals to track, optimize, and project their taxes and insurance.

## Features

- **Take-Home Calculator**: Real-time tax calculation for Nigerian states.
- **Optimization Engine**: Suggestions to reduce tax burden legitmately.
- **Multi-Year Projection**: Plan for future income growth.
- **Quarterly Scheduler**: Never miss a filing deadline.
- **Review Alerts**: Timely notifications for tax reviews.

## Deployment

### Option 1: Netlify (Recommended)

1. Install Netlify CLI: `npm install -g netlify-cli`
2. Deploy the build: `netlify deploy --dir=dist --prod`

### Option 2: Vercel

1. Install Vercel CLI: `npm install -g vercel`
2. Deploy: `vercel --prod`

### Option 3: Manual Upload

You can simply drag and drop the `dist/` folder into the Netlify or Vercel web dashboards.

## Build Instructions

To build the project manually:

```bash
npm run build
```

This will generate the `dist/` folder.
