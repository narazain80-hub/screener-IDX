import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'

export function useAutoRefresh(keys:string[]=[]){
  const qc = useQueryClient()
  useEffect(()=>{
    const id = setInterval(()=>{
      keys.forEach(k=> qc.invalidateQueries([k]))
    }, 1000*60*15)
    return ()=> clearInterval(id)
  },[qc, keys])
}
