import React from 'react'

export default function Sidebar(){
  return (
    <aside className="w-72 p-4">
      <div className="mb-6">
        <div className="text-2xl font-bold">Screener IDX</div>
        <div className="text-sm text-zinc-400">Modern stock screener</div>
      </div>
      <nav className="flex flex-col gap-2">
        <a className="small-glass p-3 flex items-center gap-3" href="#">Dashboard</a>
        <a className="small-glass p-3 flex items-center gap-3" href="#">Fibonacci Golden Zone</a>
        <a className="small-glass p-3 flex items-center gap-3" href="#">Breakout Resistance</a>
        <a className="small-glass p-3 flex items-center gap-3" href="#">Reversal Bearish</a>
        <a className="small-glass p-3 flex items-center gap-3" href="#">Watchlist</a>
        <a className="small-glass p-3 flex items-center gap-3" href="#">Settings</a>
      </nav>
    </aside>
  )
}
