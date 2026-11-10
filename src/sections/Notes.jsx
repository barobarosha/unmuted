import { useCallback, useEffect, useRef, useState } from 'react'
import { prefersReducedMotion } from '../hooks/useReveal.js'
import SectionLead from '../parts/SectionLead.jsx'
import { useScrollScene } from '../hooks/useScrollScene.js'
import { notes } from '../data/notes.js'
import { useLang } from '../i18n/LangContext.jsx'

const readDuration = (name, fallback) => {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  if (!raw) return fallback
  return raw.endsWith('ms') ? parseFloat(raw) : parseFloat(raw) * 1000
}

export default function Notes({ chapter }) {
  const [openId, setOpenId] = useState(null)
  const sceneRef = useScrollScene()
  const { t } = useLang()
  const wraps = useRef(new Map())
  const anims = useRef(new Map())

  const animate = useCallback((id, open) => {
    const wrap = wraps.current.get(id)
    if (!wrap) return
    anims.current.get(id)?.cancel()
    if (prefersReducedMotion()) {
      wrap.style.height = open ? 'auto' : '0px'
      return
    }
    const from = wrap.getBoundingClientRect().height
    const to = open ? wrap.scrollHeight : 0
    const anim = wrap.animate(
      [{ height: `${from}px` }, { height: `${to}px` }],
      {
        duration: open ? readDuration('--file-open', 420) : readDuration('--file-close', 280),
        easing: 'cubic-bezier(.16,1,.3,1)',
        fill: 'forwards'
      }
    )
    anims.current.set(id, anim)
    anim.finished
      .then(() => {
        wrap.style.height = open ? 'auto' : '0px'
        anim.cancel()
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    wraps.current.forEach((wrap, id) => {
      if (!wrap) return
      if (id === openId) animate(id, true)
      else if (wrap.getBoundingClientRect().height > 0) animate(id, false)
    })
  }, [openId, animate])

  return (
    <section className="sectionband shell scene notescene" id={chapter.id} ref={sceneRef}>
      <div className="sceneholder">
        <SectionLead {...chapter} />

        <div className="notelist" data-scene-layer="1">
          {notes.map((note) => {
            const open = openId === note.id
            return (
              <article className={`noterow${open ? ' open' : ''}`} key={note.id} data-scene-layer="1">
                <button
                  type="button"
                  className="notehead"
                  aria-expanded={open}
                  aria-controls={`note-${note.id}`}
                  onClick={() => setOpenId(open ? null : note.id)}
                >
                  <span className="notewhen numeral">{note.date}</span>
                  <span>
                    <span className="notetitle">{t(note.title)}</span>
                    <span className="noteexcerpt">{t(note.excerpt)}</span>
                  </span>
                  <span className="notesign" aria-hidden="true" />
                </button>
                <div
                  className="notebodywrap"
                  id={`note-${note.id}`}
                  hidden={!open}
                  ref={(node) => {
                    if (node) wraps.current.set(note.id, node)
                    else wraps.current.delete(note.id)
                  }}
                >
                  <p className="notebody">{t(note.body)}</p>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
