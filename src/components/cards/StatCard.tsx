import React from 'react'

const StatCard:React.FC<{title:string,value:string|number}> = ({title,value}) => {
  return (
    <div className="card p-4">
      <div className="text-sm text-zinc-400">{title}</div>
      <div className="text-2xl font-semibold mt-1">{value}</div>
    </div>
  )
}

export default StatCard
