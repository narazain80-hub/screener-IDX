import React from 'react'
import StatCard from '../components/cards/StatCard'
import MiniChart from '../components/charts/MiniChart'

export default function Dashboard(){
  // placeholder data
  const stats = [
    {title:'Total Saham', value:900},
    {title:'Fibonacci', value:14},
    {title:'Breakout', value:7},
    {title:'Reversal', value:9},
  ];

  const topVolume = ['BBCA.JK','BMRI.JK','BBRI.JK'];
  const topGainers = ['PTRO.JK','CUAN.JK','BRPT.JK'];
  const topLosers = ['GOTO.JK','BUKA.JK','MEDC.JK'];

  return (
    <div className="grid grid-cols-12 gap-6">
      <section className="col-span-12">
        <div className="card p-4 flex items-center justify-between">
          <div>
            <div className="text-sm text-zinc-400">Market Summary</div>
            <div className="mt-2 grid grid-cols-4 gap-4">
              {stats.map(s=> <StatCard key={s.title} title={s.title} value={s.value} />)}
            </div>
          </div>
          <div className="w-1/3">
            <div className="text-sm text-zinc-400">Top Volume</div>
            <div className="mt-2">
              {topVolume.map(t=> <div key={t} className="py-1">{t}</div>)}
            </div>
            <div className="text-sm text-zinc-400 mt-3">Top Gainers</div>
            <div className="mt-2">
              {topGainers.map(t=> <div key={t} className="py-1">{t}</div>)}
            </div>
            <div className="text-sm text-zinc-400 mt-3">Top Losers</div>
            <div className="mt-2">
              {topLosers.map(t=> <div key={t} className="py-1">{t}</div>)}
            </div>
          </div>
        </div>
      </section>

      <section className="col-span-8">
        <div className="card p-4"> 
          <div className="text-sm text-zinc-400 mb-2">Heatmap Sektor</div>
          <div className="h-64 bg-gradient-to-br from-transparent to-white/2 rounded-md"></div>
        </div>
      </section>

      <section className="col-span-4">
        <div className="card p-4 mb-4">
          <div className="text-sm text-zinc-400">Activity Log</div>
          <div className="mt-2 text-sm text-zinc-200">
            - Sinyal baru pada BBCA.JK
            <br />- Breakout pada PTRO.JK
          </div>
        </div>

        <div className="card p-4">
          <div className="text-sm text-zinc-400">Example Mini Chart</div>
          <div className="mt-2">
            <MiniChart data={[{i:1,value:100},{i:2,value:110},{i:3,value:105},{i:4,value:115}]} />
          </div>
        </div>
      </section>
    </div>
  )
}
