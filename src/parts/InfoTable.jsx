import { statusLabels, typeLabels } from '../data/projects.js'
import { useLang } from '../i18n/LangContext.jsx'
import { ui } from '../i18n/ui.js'

export default function InfoTable({ project }) {
  const { lang, t } = useLang()
  const joiner = lang === 'zh' ? '、' : ', '

  const rows = [
    ['type', t(ui.info.type), t(typeLabels[project.type]), false],
    ['city', t(ui.info.city), t(project.city), false],
    ['area', t(ui.info.area), `${project.area.toLocaleString('en-US')} m²`, true],
    ['client', t(ui.info.client), t(project.client), false],
    ['structure', t(ui.info.structure), t(project.structure), false],
    ['status', t(ui.info.status), `${t(statusLabels[project.status])} · ${project.year}`, false],
    ['team', t(ui.info.team), t(project.team).join(joiner), false],
    ['photographer', t(ui.info.photographer), t(project.photographer), false]
  ]

  return (
    <dl className="infotable">
      {rows.map(([key, label, value, numeric]) => (
        <div key={key}>
          <dt>{label}</dt>
          <dd className={numeric ? 'numeral' : undefined}>{value}</dd>
        </div>
      ))}
    </dl>
  )
}
