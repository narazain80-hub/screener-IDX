// Import node-fetch dihapus
import { UNIVERSE } from './universe'

const TTL = 1000 * 60 * 15 // 15 min

type CacheEntry = { ts:number, data:any }

const globalAny:any = globalThis as any
if(!globalAny.__YAHOO_CACHE) globalAny.__YAHOO_CACHE = new Map<string, CacheEntry>()
const CACHE: Map<string, CacheEntry> = globalAny.__YAHOO_CACHE

function cacheGet(key:string){
  const e = CACHE.get(key)
  if(!e) return null
  if(Date.now()-e.ts > TTL){ CACHE.delete(key); return null }
  return e.data
}
function cacheSet(key:string, data:any){ CACHE.set(key, { ts: Date.now(), data }) }

export default async function handler(req:any, res:any){
  try{
    const { symbols } = req.query
    if(!symbols) return res.status(400).json({ error: 'symbols query required' })
    const sym = String(symbols)
    const path = `/v7/finance/quote?symbols=${encodeURIComponent(sym)}`
    const cached = cacheGet(path)
    if(cached) return res.status(200).json(cached)

    const url = `https://query2.finance.yahoo.com${path}`
    const r = await fetch(url, { 
      headers: { 
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept': 'application/json'
      } 
    })
    
    if(!r.ok) {
      // Struktur aman dari Yahoo Finance Quote agar halaman web tidak membeku
      return res.status(200).json({ quoteResponse: { result: [], error: 'Yahoo blocked' } })
    }
    
    const json = await r.json()
    cacheSet(path, json)
    return res.status(200).json(json)
  }catch(err:any){
    console.error(err)
    return res.status(200).json({ quoteResponse: { result: [], error: String(err) } })
  }
}
