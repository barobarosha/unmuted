import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '../hooks/useReveal.js'
import { useLang } from '../i18n/LangContext.jsx'

/** 名称按语言切分：中文逐字，英文逐词，避免英文被拆成孤立字母 */
const splitName = (name, lang) =>
  lang === 'zh' ? Array.from(name) : name.split(/(\s+)/).filter((part) => part.trim().length)

/** 首屏：文字先于图片占据视野，图作为背景在文字之后缓慢揭开 */
export default function Cover({ studio, stats, sentinelRef }) {
  const rootRef = useRef(null)
  const { lang, t } = useLang()

  useEffect(() => {
    const node = rootRef.current
    if (!node) return
    if (prefersReducedMotion()) {
      node.classList.add('shown')
      return
    }
    const id = requestAnimationFrame(() => node.classList.add('shown'))
    return () => cancelAnimationFrame(id)
  }, [])

  // 正文覆盖上来的过程中，首屏按被盖住的比例退后，而不是被整块拉走
  useEffect(() => {
    const node = rootRef.current
    if (!node) return
    const holder = node.querySelector('.coverholder')

    const stackQuery = window.matchMedia('(max-width: 860px)')
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    let raf = 0
    let idle = false

    const measure = () => {
      raf = 0
      const room = node.offsetHeight || 1
      const covered = Math.min(Math.max(window.scrollY / room, 0), 1)
      node.style.setProperty('--covered', covered.toFixed(4))
      // 首屏被正文完全盖过去之后就不可见，避免在页脚等后续区域露出
      if (holder) holder.style.visibility = covered >= 1 ? 'hidden' : ''
    }

    const schedule = () => {
      if (idle || raf) return
      raf = requestAnimationFrame(measure)
    }

    const sync = () => {
      cancelAnimationFrame(raf)
      raf = 0
      idle = stackQuery.matches || motionQuery.matches
      if (idle) {
        node.style.removeProperty('--covered')
        if (holder) holder.style.visibility = ''
      }
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
  }, [])

  const name = t(studio.name)
  const glyphs = splitName(name, lang)

  return (
    <section className="cover" id="top" ref={rootRef}>
      <div className="coverholder">
      <div className="coverbackdrop" aria-hidden="true">
        <img
          src="assets/images/dragon-hero-dark.png"
          alt=""
          width="784"
          height="769"
          {...{ fetchpriority: 'high' }}
          decoding="async"
        />
        <span className="coverveil" />
      </div>

      <div className="shell coverinner">
        <p className="covereyebrow">{t('Разговорный клуб английского', 'English speaking club')}</p>
        <h1 className="namemark" aria-label={name}>
          {glyphs.map((glyph, index) => (
            <span className="glyphbox" key={`${glyph}-${index}`} aria-hidden="true">
              <span className="glyph" style={{ '--glyph-index': Math.min(index, 12) }}>
                {glyph}
              </span>
            </span>
          ))}
        </h1>

        <div className="coverbrief">
          <p className="coverlead">{t(studio.positioning)}</p>
          <p className="coverabout">{t(studio.about)}</p>
          <p className="covercta"><a href="#contact">{t('Записаться на пробное занятие', 'Book a trial lesson')} →</a></p>
        </div>

        <dl className="covertally">
          {stats.map((item, index) => (
            <div className="tallyitem" key={item.key} style={{ '--tally-index': index }}>
              <dt className="overline">{item.label}</dt>
              <dd className="tallynum numeral">{item.value}</dd>
              <dd className="tallynote">{item.note}</dd>
            </div>
          ))}
        </dl>
      </div>

      <p className="dragonballoon">{t('«О, гость! Я DragDealer — твой учитель и проводник на всё обучение»', '"Oh, a guest! I\'m DragDealer — your teacher and guide for the whole journey"')}</p>
      </div>

      <div ref={sentinelRef} aria-hidden="true" />
    </section>
  )
}