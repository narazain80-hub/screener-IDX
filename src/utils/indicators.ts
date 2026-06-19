export function sma(values:number[], period:number){
  const out:(number|null)[] = []
  for(let i=0;i<values.length;i++){
    if(i+1<period){ out.push(null); continue }
    const slice = values.slice(i+1-period, i+1)
    const sum = slice.reduce((a,b)=>a+b,0)
    out.push(sum/period)
  }
  return out
}

export function ema(values:number[], period:number){
  const out:(number|null)[] = []
  const k = 2/(period+1)
  let prev:number|null = null
  for(let i=0;i<values.length;i++){
    const v = values[i]
    if(i===0){ prev = v; out.push(prev); continue }
    prev = prev===null ? v : v*k + prev*(1-k)
    out.push(prev)
  }
  return out
}

export function rsi(values:number[], period=14){
  const out:(number|null)[] = []
  for(let i=0;i<values.length;i++){
    if(i===0){ out.push(null); continue }
    if(i<period){ out.push(null); continue }
    const slice = values.slice(i-period+1, i+1)
    let gains=0, losses=0
    for(let j=1;j<slice.length;j++){
      const ch = slice[j]-slice[j-1]
      if(ch>0) gains+=ch; else losses+=-ch
    }
    const avgG = gains/period
    const avgL = losses/period
    const rs = avgL===0 ? 100 : avgG/avgL
    out.push(100 - (100/(1+rs)))
  }
  return out
}
