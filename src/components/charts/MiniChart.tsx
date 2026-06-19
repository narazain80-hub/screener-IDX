import React from 'react'
import { LineChart, Line, ResponsiveContainer } from 'recharts'

export default function MiniChart({data, color='\u002310B981'}:{data:{i:number,value:number}[], color?:string}){
  return (
    <div style={{width:'100%',height:60}}>
      <ResponsiveContainer width="100%" height={60}>
        <LineChart data={data}>
          <Line dataKey="value" stroke={color} dot={false} strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
