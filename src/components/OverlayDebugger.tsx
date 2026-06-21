import React, { useEffect, useState } from 'react'
import { neutralizeFullscreenOverlays } from '../../utils/detectOverlay'

type Candidate = {
  tag: string | null
  id: string | null
  className: string | null
  pointerEvents: string | null
  zIndex: string | null
  opacity: string | null
}

export default function OverlayDebugger(){
  const [visible, setVisible] = useState(false)
  const [candidates, setCandidates] = useState<Candidate[]>([])

  function findCandidates(): Candidate[] {
    try {
      const vw = window.innerWidth
      const vh = window.innerHeight
      const els = Array.from(document.querySelectorAll<HTMLElement>('*')).filter(e => {
        const r = e.getBoundingClientRect()
        const s = getComputedStyle(e)
        const visible = s.display !== 'none' && s.visibility !== 'hidden'
        const coversViewport = r.width >= vw - 1 && r.height >= vh - 1 && r.top <= 1 && r.left <= 1
        return visible && coversViewport
      })
      return els.map(e => ({
        tag: e.tagName,
        id: e.id || null,
        className: e.className || null,
        pointerEvents: getComputedStyle(e).pointerEvents || null,
        zIndex: getComputedStyle(e).zIndex || null,
        opacity: getComputedStyle(e).opacity || null,
      }))
    } catch (err) {
      console.error('OverlayDebugger findCandidates error', err)
      return []
    }
  }

  useEffect(() => {
    // initial scan
    setCandidates(findCandidates())

    const onResize = () => setCandidates(findCandidates())
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  function handleNeutralize(){
    neutralizeFullscreenOverlays()
    setCandidates(findCandidates())
  }

  function handleRestore(){
    // restore inline styles we set earlier
    Array.from(document.querySelectorAll<HTMLElement>('[data-_old-pointer]')).forEach(e => {
      e.style.pointerEvents = (e.dataset._oldPointer as string) || ''
      e.style.cursor = (e.dataset._oldCursor as string) || ''
      e.removeAttribute('data-_old-pointer')
      e.removeAttribute('data-_old-cursor')
    })
    // also remove autoDisabled marker
    Array.from(document.querySelectorAll<HTMLElement>('[data-auto-disabled]')).forEach(e => {
      e.removeAttribute('data-auto-disabled')
    })
    setCandidates(findCandidates())
  }

  return (
    <>
      <div style={{position:'fixed',right:12,bottom:12,zIndex:99999}}>
        <button
          onClick={()=>setVisible(v=>!v)}
          style={{padding:'8px 10px',borderRadius:8,background:'#0b1120',color:'#fff',border:'1px solid rgba(255,255,255,0.06)'}}
        >{visible? 'Close Debug' : 'Overlay Debug'}</button>
      </div>

      {visible && (
        <div style={{position:'fixed',right:12,bottom:56,zIndex:99999,width:360,maxHeight:'60vh',overflow:'auto',background:'rgba(6,8,15,0.95)',color:'#e6eef8',padding:12,borderRadius:8,border:'1px solid rgba(255,255,255,0.04)'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <strong>Overlay Debugger</strong>
            <div style={{fontSize:12,opacity:0.8}}>{candidates.length} candidate(s)</div>
          </div>

          <div style={{marginTop:8,display:'flex',gap:8}}>
            <button onClick={handleNeutralize} style={{flex:1,padding:8,borderRadius:6,background:'#0b7b3b',border:'none'}}>Neutralize</button>
            <button onClick={handleRestore} style={{flex:1,padding:8,borderRadius:6,background:'#333',border:'1px solid rgba(255,255,255,0.04)'}}>Restore</button>
          </div>

          <div style={{marginTop:10,fontSize:13}}>
            {candidates.length === 0 && <div style={{opacity:0.75}}>No fullscreen candidates found.</div>}
            {candidates.map((c, idx) => (
              <div key={idx} style={{padding:8,marginTop:8,background:'rgba(255,255,255,0.02)',borderRadius:6}}>
                <div style={{fontSize:12,opacity:0.85}}><strong>{c.tag}</strong> {c.id? `#${c.id}` : ''} <span style={{opacity:0.6}}>{c.className? c.className : ''}</span></div>
                <div style={{fontSize:12,marginTop:6}}>pointer-events: <code style={{opacity:0.9}}>{c.pointerEvents}</code></div>
                <div style={{fontSize:12}}>z-index: <code style={{opacity:0.9}}>{c.zIndex}</code></div>
                <div style={{fontSize:12}}>opacity: <code style={{opacity:0.9}}>{c.opacity}</code></div>
                <div style={{marginTop:8,display:'flex',gap:8}}>
                  <button onClick={() => {
                    const el = document.querySelector(c.id? `#${c.id}` : `${c.tag}`) as HTMLElement | null
                    if (el) {
                      el.dataset._oldPointer = el.style.pointerEvents || ''
                      el.dataset._oldCursor = el.style.cursor || ''
                      el.style.pointerEvents = 'none'
                      el.dataset._autoDisabled = 'true'
                      setCandidates(findCandidates())
                    }
                  }} style={{padding:6,background:'#0b7b3b',border:'none',borderRadius:6,color:'#fff'}}>Disable</button>

                  <button onClick={() => {
                    const el = document.querySelector(c.id? `#${c.id}` : `${c.tag}`) as HTMLElement | null
                    if (el) {
                      el.style.pointerEvents = el.dataset._oldPointer || ''
                      el.style.cursor = el.dataset._oldCursor || ''
                      el.removeAttribute('data-_old-pointer')
                      el.removeAttribute('data-_old-cursor')
                      el.removeAttribute('data-auto-disabled')
                      setCandidates(findCandidates())
                    }
                  }} style={{padding:6,background:'#333',border:'1px solid rgba(255,255,255,0.04)',borderRadius:6,color:'#fff'}}>Restore</button>
                </div>
              </div>
            ))}
          </div>

          <div style={{marginTop:12,fontSize:12,opacity:0.75}}>
            Tip: Jika elemen memang sengaja memblokir klik (mis. loading modal), tambahkan attribute <code>data-blocking="true"</code> pada elemen tersebut.
          </div>
        </div>
      )}
    </>
  )
}
