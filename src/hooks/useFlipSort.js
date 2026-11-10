import { useCallback, useRef } from 'react'
import { prefersReducedMotion } from './useReveal.js'

const readDuration = (name, fallback) => {
  if (typeof window === 'undefined') return fallback
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  if (!raw) return fallback
  return raw.endsWith('ms') ? parseFloat(raw) : parseFloat(raw) * 1000
}

/** 先量后动的 FLIP；新一轮先让上一轮落位，绝不叠加 */
export function useFlipSort() {
  const scopeRef = useRef(null)

  const play = useCallback((mutate) => {
    const scope = scopeRef.current
    if (!scope || prefersReducedMotion()) {
      mutate()
      return
    }
    const rows = Array.from(scope.querySelectorAll('[data-flip]'))
    rows.forEach((row) => row.getAnimations().forEach((a) => a.finish()))
    const first = new Map(rows.map((row) => [row.dataset.flip, row.getBoundingClientRect().top]))
    mutate()
    requestAnimationFrame(() => {
      const duration = readDuration('--flip', 320)
      scope.querySelectorAll('[data-flip]').forEach((row, index) => {
        const before = first.get(row.dataset.flip)
        if (before === undefined) return
        const delta = before - row.getBoundingClientRect().top
        if (!delta) return
        row.animate(
          [{ transform: `translateY(${delta}px)` }, { transform: 'translateY(0)' }],
          {
            duration,
            easing: 'cubic-bezier(.19,1,.22,1)',
            delay: Math.min(index * 18, 180)
          }
        )
      })
    })
  }, [])

  return { scopeRef, play }
}
