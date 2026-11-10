import { useLang } from '../i18n/LangContext.jsx'

export default function SiteFooter({ studio }) {
  const { t } = useLang()
  const year = new Date().getFullYear()
  return (
    <footer className="sitefooter">
      <div className="shell sitefooterinner">
        <span className="footname">{t(studio.name)} · {t(studio.discipline)}</span>
        <span className="footlinks">
          <a href={studio.telegramUrl} target="_blank" rel="noreferrer">{studio.telegram}</a>
          <a href={`mailto:${studio.email}`}>{studio.email}</a>
          <a href="#/privacy">Политика обработки персональных данных</a>
        </span>
        <span className="numeral">© {year}</span>
      </div>
    </footer>
  )
}
