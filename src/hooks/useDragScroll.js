import { useEffect, useRef, useState } from 'react'

/** 图纸带：指针拖拽 + 原生横滑，进度按 scrollLeft 连续映射 */
export function useDragScroll() {
  const ref = useRef(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    let down = false
    let dragging = false
    let startX = 0
    let startLeft = 0

    const measure = () => {
      const span = node.scrollWidth - node.clientWidth
      setProgress(span > 1 ? Math.min(1, Math.max(0, node.scrollLeft / span)) : 0)
    }

    const onPointerDown = (event) => {
      if (event.pointerType === 'touch') return
      down = true
      startX = event.clientX
      startLeft = node.scrollLeft
    }

    const onPointerMove = (event) => {
      if (!down) return
      const delta = event.clientX - startX
      if (!dragging) {
        if (Math.abs(delta) < 6) return
        dragging = true
        node.classList.add('dragging')
        node.setPointerCapture?.(event.pointerId)
      }
      node.scrollLeft = startLeft - delta
    }

    const release = (event) => {
      if (dragging) {
        node.releasePointerCapture?.(event.pointerId)
        node.classList.remove('dragging')
      }
      down = false
      dragging = false
    }

    const onKeyDown = (event) => {
      const step = node.clientWidth * 0.8
      if (event.key === 'ArrowRight') {
        event.preventDefault()
        node.scrollBy({ left: step, behavior: 'smooth' })
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault()
        node.scrollBy({ left: -step, behavior: 'smooth' })
      }
    }

    node.addEventListener('scroll', measure, { passive: true })
    node.addEventListener('pointerdown', onPointerDown)
    node.addEventListener('pointermove', onPointerMove)
    node.addEventListener('pointerup', release)
    node.addEventListener('pointercancel', release)
    node.addEventListener('pointerleave', release)
    node.addEventListener('keydown', onKeyDown)
    measure()

    return () => {
      node.removeEventListener('scroll', measure)
      node.removeEventListener('pointerdown', onPointerDown)
      node.removeEventListener('pointermove', onPointerMove)
      node.removeEventListener('pointerup', release)
      node.removeEventListener('pointercancel', release)
      node.removeEventListener('pointerleave', release)
      node.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  return { ref, progress }
}
