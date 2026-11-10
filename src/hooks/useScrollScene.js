import { useEffect, useRef } from 'react'

const STACK_QUERY = '(max-width: 860px)'

const clamp = (value, min, max) => Math.min(max, Math.max(min, value))

/** 两端平滑的插值，让进入与离开都没有硬边 */
const smoothstep = (edge0, edge1, x) => {
  const t = clamp((x - edge0) / (edge1 - edge0), 0, 1)
  return t * t * (3 - 2 * t)
}

/**
 * 章节级的滚动场景：把「这个章节在视野里走到了第几分」换算成三个自定义属性，
 * 章节自己决定怎么消费，图与文因此在同一条行程上分头推进。
 *   --pass   0 → 1   章节从进场到出场的总进度
 *   --in     0 → 1   进场程度，用于揭开裁切与落定位移
 *   --out    0 → 1   出场程度，用于把读完的一段轻轻推远
 * 章节内的元素还会各自拿到一份带错位的 --lag，同一段落里图先于文落定。
 * 窄屏与 prefers-reduced-motion 下不写任何变量，退回静态排版。
 */
export function useScrollScene() {
  const sceneRef = useRef(null)

  useEffect(() => {
    const scene = sceneRef.current
    if (!scene) return

    const layers = Array.from(scene.querySelectorAll('[data-scene-layer]'))
    const holder = scene.querySelector('.sceneholder')
    const stackQuery = window.matchMedia(STACK_QUERY)
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    let raf = 0
    let idle = false

    const reset = () => {
      ;['--pass', '--in', '--out'].forEach((name) => scene.style.removeProperty(name))
      scene.classList.remove('held')
      layers.forEach((layer) => {
        layer.style.removeProperty('--lag')
        layer.style.removeProperty('--near')
      })
    }

    /* 一屏装得下的章节才钉住：钉住期间读完，再由下一章节覆盖上来 */
    const fit = () => {
      if (!holder) return
      const room = window.innerHeight - (parseFloat(getComputedStyle(holder).top) || 0) - 24
      scene.classList.toggle('held', holder.scrollHeight <= room)
    }

    const measure = () => {
      raf = 0
      const rect = scene.getBoundingClientRect()
      const view = window.innerHeight
      // 章节底边刚进视野记 0，章节顶边升出视野记 1
      const span = rect.height + view
      const pass = span > 0 ? clamp((view - rect.top) / span, 0, 1) : 0
      const entered = smoothstep(0, 0.34, pass)
      const left = smoothstep(0.76, 1, pass)

      scene.style.setProperty('--pass', pass.toFixed(4))
      scene.style.setProperty('--in', entered.toFixed(4))
      scene.style.setProperty('--out', left.toFixed(4))

      layers.forEach((layer) => {
        const box = layer.getBoundingClientRect()
        if (!box.height) return
        // 每层按自身在视野中的位置单独计时，读起来才是一层层递进
        const own = clamp((view - box.top) / (box.height * 0.62 + view * 0.42), 0, 1)
        const delay = Number(layer.dataset.sceneLayer) || 0
        layer.style.setProperty('--lag', smoothstep(0.08 + delay * 0.05, 0.62 + delay * 0.05, own).toFixed(4))
        // 元素中线与视野中线的接近度，用来把当前正在读的一层提到最前
        const center = box.top + box.height / 2
        layer.style.setProperty('--near', (1 - clamp(Math.abs(center - view / 2) / (view * 0.62), 0, 1)).toFixed(4))
      })
    }

    const schedule = () => {
      if (idle || raf) return
      raf = requestAnimationFrame(measure)
    }

    const sync = () => {
      cancelAnimationFrame(raf)
      raf = 0
      idle = stackQuery.matches || motionQuery.matches
      if (idle) reset()
      else {
        fit()
        measure()
      }
    }

    sync()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', sync)
    stackQuery.addEventListener('change', sync)
    motionQuery.addEventListener('change', sync)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', sync)
      stackQuery.removeEventListener('change', sync)
      motionQuery.removeEventListener('change', sync)
    }
  }, [])

  return sceneRef
}
