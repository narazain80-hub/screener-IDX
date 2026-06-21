// Utility to detect and neutralize full-screen overlays that accidentally block pointer events
export function neutralizeFullscreenOverlays() {
  try {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const candidates = Array.from(document.querySelectorAll<HTMLElement>('*')).filter(e => {
      const r = e.getBoundingClientRect();
      const style = getComputedStyle(e);
      const visible = style.display !== 'none' && style.visibility !== 'hidden';
      const coversViewport = r.width >= vw - 1 && r.height >= vh - 1 && r.top <= 1 && r.left <= 1;
      return visible && coversViewport;
    });

    if (candidates.length === 0) {
      console.info('[detectOverlay] no fullscreen blocking elements found');
      return [];
    }

    console.group('[detectOverlay] fullscreen candidates');
    candidates.forEach((el, idx) => {
      const cs = getComputedStyle(el);
      console.log(idx, {
        tag: el.tagName,
        id: el.id || null,
        className: el.className || null,
        pointerEvents: cs.pointerEvents,
        zIndex: cs.zIndex,
        opacity: cs.opacity,
      });

      // only neutralize if element does NOT declare itself intentionally blocking
      if (!el.hasAttribute('data-blocking')) {
        el.dataset._oldPointer = el.style.pointerEvents || '';
        el.style.pointerEvents = 'none';
        el.dataset._autoDisabled = 'true';
        console.log('[detectOverlay] neutralized', el);
      } else {
        console.log('[detectOverlay] skipped (data-blocking present)', el);
      }
    });
    console.groupEnd();

    return candidates;
  } catch (err) {
    console.error('[detectOverlay] error', err);
    return [];
  }
}
