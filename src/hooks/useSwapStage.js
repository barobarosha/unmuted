import { useCallback, useEffect, useRef, useState } from 'react'
import { prefersReducedMotion } from './useReveal.js'

const STACK_QUERY = '(max-width: 860px)'
const VARS = ['--clip', '--enter', '--sink', '--vis', '--shift']

const clamp = (value, min, max) => Math.min(max, Math.max(min, value))

/** 两端平滑的插值，用来在切换窗口内做加减速 */
const smoothstep = (edge0, edge1, x) => {
  const t = clamp((x - edge0) / (edge1 - edge0), 0, 1)
  return t * t * (3 - 2 * t)
}

/**
 * 滚动驱动的换片舞台：视口被 sticky 钉住，滚动推进的是「第几张」而不是页面位置。
 * 每帧给每张片子写下五个自定义属性，CSS 只负责消费：
 *   --clip   100% → 0%   新的一张自下而上揭开的裁切量
 *   --enter  0 → 1       进入程度，用于图片的落定缩放
 *   --sink   0 → 1       离开程度，退到后层时的下沉量
 *   --vis    0 → 1       文字可见度
 *   --shift  px          文字的纵向位移
 * tail 是末尾留白的行程占比：最后一张揭完后原地停住，不被立刻推走。
 * 窄屏、prefers-reduced-motion 与 idle 为真时不写任何变量，退回普通的堆叠列表。
 */
export function useSwapStage(count, options = {}) {
  const {
    viewport: viewportSelector,
    slide: slideSelector,
    rail: railSelector,
    tail = 0,
    idle: forcedIdle = false
  } = options

  const stageRef = useRef(null)
  const [active, setActive] = useState(0)
  const metrics = useRef({ travel: 0, sticky: 0 })

  const goTo = useCallback(
    (index) => {
      const stage = stageRef.current
      if (!stage) return
      const { travel, sticky } = metrics.current
      if (travel <= 0 || count < 2) {
        stage.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' })
        return
      }
      // 舞台顶端滚到 sticky 落位处，再按目标序号补上该走的行程
      const stageTop = stage.getBoundingClientRect().top + window.scrollY
      window.scrollTo({
        top: stageTop - sticky + (index / (count - 1)) * travel * (1 - tail),
        behavior: prefersReducedMotion() ? 'auto' : 'smooth'
      })
    },
    [count, tail]
  )

  useEffect(() => {
    const stage = stageRef.current
    if (!stage || count < 1) return

    const viewport = stage.querySelector(viewportSelector)
    const slides = Array.from(stage.querySelectorAll(slideSelector))
    const rail = railSelector ? stage.querySelector(railSelector) : null
    if (!viewport || !slides.length) return

    const stackQuery = window.matchMedia(STACK_QUERY)
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    let raf = 0
    let last = -1
    let idle = false

    const reset = () => {
      slides.forEach((slide) => {
        VARS.forEach((name) => slide.style.removeProperty(name))
        slide.classList.add('current')
      })
      rail?.style.removeProperty('--fill')
      metrics.current = { travel: 0, sticky: 0 }
      if (last !== 0) {
        last = 0
        setActive(0)
      }
    }

    const measure = () => {
      raf = 0
      const travel = stage.offsetHeight - viewport.offsetHeight
      const stageTop = stage.getBoundingClientRect().top
      const viewportTop = viewport.getBoundingClientRect().top
      // sticky 已经滑过的距离，直接反映钉住状态，不必猜 top 偏移量
      const slid = viewportTop - stageTop
      metrics.current = { travel, sticky: parseFloat(getComputedStyle(viewport).top) || 0 }

      const ratio = travel > 0 ? clamp(slid / travel, 0, 1) : 0
      const paced = tail > 0 ? clamp(ratio / (1 - tail), 0, 1) : ratio
      const linear = paced * (count - 1)
      const base = Math.min(Math.floor(linear), count - 1)
      // 每张先停留四成行程，其余行程用来完成切换，读起来才像在换片而不是在滑动
      const progress = base + smoothstep(0.42, 1, linear - base)

      slides.forEach((slide, index) => {
        const offset = progress - index
        const incoming = clamp(-offset, 0, 1)
        const outgoing = clamp(offset, 0, 1)
        slide.style.setProperty('--clip', `${(incoming * 100).toFixed(2)}%`)
        slide.style.setProperty('--enter', (1 - incoming).toFixed(3))
        slide.style.setProperty('--sink', outgoing.toFixed(3))
        slide.style.setProperty('--vis', clamp(1 - Math.abs(offset) * 1.9, 0, 1).toFixed(3))
        slide.style.setProperty('--shift', `${(offset * -30).toFixed(1)}px`)
        slide.classList.toggle('current', Math.abs(offset) < 0.5)
      })

      rail?.style.setProperty('--fill', paced.toFixed(4))

      const index = clamp(Math.round(progress), 0, count - 1)
      if (index !== last) {
        last = index
        setActive(index)
      }
    }

    const schedule = () => {
      if (idle || raf) return
      raf = requestAnimationFrame(measure)
    }

    const sync = () => {
      cancelAnimationFrame(raf)
      raf = 0
      idle = forcedIdle || stackQuery.matches || motionQuery.matches
      if (idle) reset()
      else measure()
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
  }, [count, viewportSelector, slideSelector, railSelector, tail, forcedIdle])

  return { stageRef, active, goTo }
}
