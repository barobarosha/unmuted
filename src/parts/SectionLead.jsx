import { useReveal } from '../hooks/useReveal.js'
import { useLang } from '../i18n/LangContext.jsx'

export default function SectionLead({ title, guide }) {
  const ref = useReveal()
  const { t } = useLang()

  return (
    <div className={`sectionlead reveal${guide ? '' : ' solo'}`} ref={ref} data-scene-layer="0">
      <div>
        <h2>
          <span className="leadtitle">{t(title)}</span>
        </h2>
      </div>
      {guide ? <p className="leadnote">{t(guide)}</p> : null}
    </div>
  )
}
