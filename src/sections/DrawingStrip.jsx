import { useDragScroll } from '../hooks/useDragScroll.js'
import { useScrollScene } from '../hooks/useScrollScene.js'
import SectionLead from '../parts/SectionLead.jsx'
import { useLang } from '../i18n/LangContext.jsx'
import { ui } from '../i18n/ui.js'

export default function DrawingStrip({ sheets, chapter, title, compact = false }) {
  const { ref, progress } = useDragScroll()
  const sceneRef = useScrollScene()
  const { t } = useLang()

  if (!sheets || sheets.length < 3) return null

  const body = (
    <>
      <div
        className="drawingstrip"
        style={
          compact
            ? undefined
            : {
                backgroundImage:
                  'linear-gradient(rgba(252,252,252,.93), rgba(252,252,252,.93)), url(assets/images/texture-paper-01.webp)'
              }
        }
        ref={ref}
        tabIndex={0}
        role="group"
        aria-label={t(ui.strip.aria)}
      >
        {sheets.map((sheet, index) => {
          const caption = t(sheet.caption)
          return (
            <figure className="drawingcard" key={sheet.src + index}>
              <div className="figure">
                <img
                  src={sheet.src}
                  alt={caption}
                  width="1400"
                  height="933"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <figcaption>
                <span className="sheetno numeral">{String(index + 1).padStart(2, '0')}</span>
                <span>{caption}</span>
              </figcaption>
            </figure>
          )
        })}
      </div>
      <div className="striprail" aria-hidden="true">
        <span className="stripfill" style={{ transform: `scaleX(${progress})` }} />
      </div>
      <div className="stripmeta">
        <span className="overline">{t(ui.strip.hint)}</span>
        <span className="numeral">{t(ui.strip.count)(String(sheets.length).padStart(2, '0'))}</span>
      </div>
    </>
  )

  if (compact) {
    return (
      <div className="filesheets">
        <div className="sheetlead">
          <span className="overline">{title}</span>
          <span className="overline numeral">{String(sheets.length).padStart(2, '0')}</span>
        </div>
        {body}
      </div>
    )
  }

  return (
    <section className="sectionband shell scene drawingscene" id={chapter.id} ref={sceneRef}>
      <div className="sceneholder">
        <SectionLead {...chapter} />
        <div className="scenebody" data-scene-layer="1">{body}</div>
      </div>
    </section>
  )
}
