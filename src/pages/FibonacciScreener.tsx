import React, { useEffect, useState } from 'react'
import { fetchChart } from '../services/api'
import MiniChart from '../components/charts/MiniChart'
import { analyzeForFibo } from '../services/screener'

export default function FibonacciScreener(){
  const [results,setResults] = useState<any[]>([])

  useEffect(()=>{
    // demo: fetch sample symbol chart and analyze
    (async ()=>{
      try{
        const chart = await fetchChart('BBCA.JK','1y','1d')
        // analyzeForFibo should be implemented fully; here we push a placeholder
        setResults([{symbol:'BBCA.JK', name:'Bank Central Asia', price:8400, f50:8200, f618:8000, volume:120000, rsi:52, score:78}])
      }catch(err){
        console.error(err)
      }
    })()
  },[])

  return (
    <div className="card p-4">
      <div className="text-lg font-semibold">Fibonacci Golden Zone</div>
      <div className="mt-4">
        <table className="w-full text-sm">
          <thead className="text-zinc-400">
            <tr>
              <th className="text-left">Kode</th>
              <th className="text-left">Nama</th>
              <th>Harga</th>
              <th>Fibonacci 0.5</th>
              <th>Fibonacci 0.618</th>
              <th>Volume</th>
              <th>RSI</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {results.map(r=> (
              <tr key={r.symbol} className="border-t border-white/3">
                <td>{r.symbol}</td>
                <td>{r.name}</td>
                <td>{r.price}</td>
                <td>{r.f50}</td>
                <td>{r.f618}</td>
                <td>{r.volume}</td>
                <td>{r.rsi}</td>
                <td>{r.score}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
