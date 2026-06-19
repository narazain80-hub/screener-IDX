# Screener IDX 📈

Modern stock screener for Indonesia (IDX) built with React, TypeScript, Vite, and Tailwind CSS. Uses Yahoo Finance as data source via serverless API proxy.

## Features

✨ **Dashboard** - Market overview with key metrics

🔍 **Fibonacci Golden Zone** - Detect stocks in pullback to golden zone

📊 **Breakout Resistance** - Find stocks breaking above resistance levels

🔄 **Reversal Bearish** - Identify potential reversal patterns

📱 **Responsive Design** - Works on desktop and mobile

⚡ **Auto Refresh** - Data updates every 15 minutes

🎨 **Professional UI** - Bloomberg-like dark theme with glassmorphism

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS 3
- **Charting**: Recharts
- **Icons**: Lucide React
- **Data Fetching**: Ky + React Query
- **Deployment**: Vercel (serverless)

## Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Open browser
http://localhost:5173
```

## Deploy to Vercel

### Option 1: CLI

```bash
npm install -g vercel
vercel
```

### Option 2: GitHub Integration

1. Push this repo to GitHub
2. Go to https://vercel.com/new
3. Import your GitHub repository
4. Vercel auto-detects Vite config
5. Deploy

## API Endpoints

- `GET /api/quote?symbols=BBCA.JK,BBRI.JK` - Fetch stock quotes
- `GET /api/chart?symbol=BBCA.JK&range=1y&interval=1d` - Fetch chart data

## Cache

- API responses cached for 15 minutes in memory
- Uses Vercel's edge caching for optimal performance

## Project Structure

```
.
├── api/              # Vercel serverless functions
├── src/
│   ├── components/   # React components
│   ├── pages/        # Page layouts
│   ├── services/     # API & business logic
│   ├── hooks/        # Custom React hooks
│   ├── utils/        # Utilities (indicators, etc)
│   ├── types/        # TypeScript types
│   └── App.tsx       # Main app component
├── index.html
└── package.json
```

## Notes

- Yahoo Finance API is free but has rate limits
- For production, consider implementing:
  - Redis cache for better performance
  - Rate limit handling with exponential backoff
  - More comprehensive error handling
  - Authentication for watchlist storage

## License

MIT
