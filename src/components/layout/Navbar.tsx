import React from 'react'

export default function Navbar(){
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <input className="bg-transparent border border-white/6 rounded-lg px-3 py-2 text-sm" placeholder="Search saham (mis. BBCA.JK)" />
        <div className="text-sm text-zinc-400">Last update: --:--</div>
      </div>
      <div className="flex items-center gap-3">
        <button className="small-glass px-3 py-2">Refresh</button>
        <button className="small-glass px-3 py-2">Dark</button>
      </div>
    </div>
  )
}
