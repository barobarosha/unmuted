import { useEffect, useRef } from 'react'

const seatsWord = (n) => {
  const m10 = n % 10, m100 = n % 100
  if (m10 === 1 && m100 !== 11) return 'место'
  if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return 'места'
  return 'мест'
}
import { prefersReducedMotion } from '../hooks/useReveal.js'
import { typeLabels } from '../data/projects.js'
import { useLang } from '../i18n/LangContext.jsx'
import { ui } from '../i18n/ui.js'

export default function HoverPreview({ project }) {
  const ref = useRef(null)
  const raf = useRef(0)
  const target = useRef({ x: 0, y: 0 })
  const current = useRef({ x: 0, y: 0 })
  const { t } = useLang()

  useEffect(() => {
    if (prefersReducedMotion()) return
    const node = ref.current
    if (!node) return

    const tick = () => {
      current.current.x += (target.current.x - current.current.x) * 0.12
      current.current.y += (target.current.y - current.current.y) * 0.12
      node.style.setProperty(
        'translate',
        `${current.current.x.toFixed(2)}px ${current.current.y.toFixed(2)}px`
      )
      raf.current = requestAnimationFrame(tick)
    }

    const onMove = (event) => {
      const ratioX = event.clientX / window.innerWidth - 0.5
      const ratioY = event.clientY / window.innerHeight - 0.5
      target.current = { x: ratioX * 22, y: ratioY * 22 }
    }

    window.addEventListener('pointermove', onMove)
    raf.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(raf.current)
    }
  }, [])

  return (
    <aside className="previewdock" aria-hidden="true">
      <div className={`previewslot${project ? ' filled' : ''}`}>
        <figure className={`hoverpreview${project ? ' shown' : ''}`} ref={ref}>
          {project ? (
            <>
              <img src={project.cover} alt="" width="960" height="640" loading="lazy" decoding="async" />
              <figcaption className="previewcaption">{t(project.name)}</figcaption>
            </>
          ) : null}
        </figure>
      </div>
      <p className="previewmeta">
        {project
          ? `${t(typeLabels[project.type])} · ${t(project.city)} · ${project.area} ${seatsWord(project.area)}`
          : t(ui.index.previewMeta)}
      </p>
    </aside>
  )
}
