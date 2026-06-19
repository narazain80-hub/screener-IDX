import ky from 'ky'

const API_BASE = import.meta.env.VITE_API_BASE || ''
const api = ky.create({ prefixUrl: API_BASE })

export async function fetchQuote(symbols: string[]) {
  const res = await api.get('/api/quote', { searchParams: { symbols: symbols.join(',') } }).json()
  return res
}

export async function fetchChart(symbol: string, range='1y', interval='1d'){
  const res = await api.get('/api/chart', { searchParams: { symbol, range, interval } }).json()
  return res
}
