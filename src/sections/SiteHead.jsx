import { useLang } from '../i18n/LangContext.jsx'
import { ui } from '../i18n/ui.js'

const NAV = ['featured', 'work', 'drawings', 'credits', 'notes', 'contact']

export default function SiteHead({ studio, compact, active, onProject = false }) {
  const { t } = useLang()
  const prefix = onProject ? '#/' : '#'

  return (
    <header className={`sitehead${compact ? ' compact' : ''}`}>
      <div className="shell siteheadinner">
        <a className="siteheadname" href={onProject ? '#/' : '#top'} aria-label={t(ui.head.home)}>
          <span className="headname">{t(studio.name)}</span>
          <span className="headrole overline">{t(studio.discipline)}</span>
        </a>

        <nav className="siteheadnav" aria-label={t(ui.head.nav)}>
          {NAV.map((id) => (
            <a
              key={id}
              href={`${prefix}${id}`}
              className={active === id ? 'current' : undefined}
              aria-current={active === id ? 'true' : undefined}
            >
              {t(ui.nav[id])}
            </a>
          ))}
        </nav>

        <div className="siteheadside">
          <a className="siteheadmail overline" href={`mailto:${studio.email}`}>
            {studio.email}
          </a>
        </div>
      </div>
    </header>
  )
}
