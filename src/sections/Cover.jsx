import { useEffect, useRef, useState } from 'react'
import { useI18n } from '../i18n.jsx'
import { studio } from '../data/studio.js'

export function Cover() {
  const { t } = useI18n()
  const name = t(studio.name)
  const coverRef = useRef(null)
  const backdropRef = useRef(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const id = window.setTimeout(() => setShown(true), 120)
    return () => window.clearTimeout(id)
  }, [])

  useEffect(() => {
    const root = coverRef.current
    const backdrop = backdropRef.current
    if (!root || !backdrop) return undefined
    let raf = 0
    const update = () => {
      const rect = root.getBoundingClientRect()
      const total = Math.max(rect.height, 1)
      const progress = Math.min(Math.max(-rect.top / total, 0), 1)
      backdrop.style.transform = `translate3d(0, ${progress * 44}px, 0) scale(${1 + progress * 0.06})`
    }
    const onScroll = () => {
      window.cancelAnimationFrame(raf)
      raf = window.requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      window.cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section className={`cover${shown ? ' shown' : ''}`} id="cover" ref={coverRef}>
      <div className="coverholder">
        <div className="coverbackdrop" aria-hidden="true">
          <img
            ref={backdropRef}
            src="assets/images/dragon-hero-dark.png"
            alt=""
            width="784"
            height="769"
            loading="eager"
            decoding="async"
          />
        </div>
        <div className="shell coverinner">
          <p className="covereyebrow">{t('Разговорный клуб английского', 'English speaking club')}</p>
          <h1 className="namemark" aria-label={name}>
            {name.split('').map((glyph, index) => (
              <span className="glyph" aria-hidden="true" key={`${glyph}-${index}`}>
                {glyph}
              </span>
            ))}
          </h1>
          <div className="coverbrief">
            <p className="coverlead">{t(studio.positioning)}</p>
            <p className="coverabout">{t(studio.about)}</p>
            <p className="covercta"><a href="#contact">{t('Записаться на пробное занятие', 'Book a trial lesson')} →</a></p>
          </div>
        </div>
        <p className="dragonballoon">{t('«О, гость! Я DragDealer — твой учитель и проводник на всё обучение»', '"Oh, a guest! I\'m DragDealer — your teacher and guide for the whole journey"')}</p>
      </div>
      <div className="coversentinel" ref={sentinelRef} aria-hidden="true" />
    </section>
  )
}