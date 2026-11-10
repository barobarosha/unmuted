import { useEffect, useRef } from 'react'

const reduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** 一次性揭示：进入视口加 shown 后立刻 unobserve，反复滚动不重播 */
export function useReveal(options) {
  const ref = useRef(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    if (reduced()) {
      node.classList.add('shown')
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('shown')
          io.unobserve(entry.target)
        })
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.12, ...options }
    )
    io.observe(node)
    return () => io.disconnect()
  }, [options])

  return ref
}

export function prefersReducedMotion() {
  return reduced()
}
