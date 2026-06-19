# Screener IDX

A modern stocks screener for Indonesia (IDX) using Yahoo Finance as data source. Built with React + TypeScript (Vite), Tailwind CSS, Recharts, and simple serverless proxy API for Yahoo endpoints.

Deploy: push to GitHub and import to Vercel. The repo uses serverless functions under /api to proxy Yahoo Finance calls.

Run locally:
- pnpm install (or npm install)
- npm run dev

Notes:
- This starter includes a small universe sample. Extend api/universe.ts with more tickers if needed.
- Cache TTL is 15 minutes for API responses.
