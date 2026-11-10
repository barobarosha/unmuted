import { useEffect } from 'react'
import DrawingStrip from './DrawingStrip.jsx'
import InfoTable from '../parts/InfoTable.jsx'
import { useReveal } from '../hooks/useReveal.js'
import { useLang } from '../i18n/LangContext.jsx'
import { ui } from '../i18n/ui.js'
import { stories, featuredIds } from '../data/stories.js'
import { projects, typeLabels, statusLabels } from '../data/projects.js'

const seatsWord = (n) => {
  const m10 = n % 10, m100 = n % 100
  if (m10 === 1 && m100 !== 11) return 'место'
  if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return 'места'
  return 'мест'
}

const SHEET_LABELS = [
  { zh: '平面', en: 'Plan' },
  { zh: '剖面', en: 'Section' },
  { zh: '轴测', en: 'Axonometric' },
  { zh: '总图', en: 'Site plan' },
  { zh: '立面', en: 'Elevation' },
  { zh: '构造详图', en: 'Construction detail' }
]

function Plate({ chapter, layout }) {
  const ref = useReveal({ threshold: 0.08 })
  const { t } = useLang()

  return (
    <section className={`storyplate reveal ${layout} ${chapter.span || 'normal'}`} ref={ref}>
      <figure className="storyfigure" style={{ aspectRatio: chapter.ratio }}>
        <img
          src={chapter.image}
          alt={t(chapter.alt)}
          loading="lazy"
          decoding="async"
          width="2000"
          height="1250"
        />
      </figure>
      <div className="storytext">
        <div className="storyhead">
          <span className="overline numeral">{chapter.no}</span>
          <h2>{t(chapter.title)}</h2>
        </div>
        <p>{t(chapter.text)}</p>
      </div>
    </section>
  )
}

export default function ProjectPage({ id, onBack }) {
  const story = stories[id]
  const project = projects.find((item) => item.id === id)
  const { t } = useLang()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [id])

  if (!project) {
    return (
      <main className="shell storymiss">
        <p className="overline">{t(ui.story.notFound)}</p>
        <h1>{t(ui.story.missTitle)}</h1>
        <p className="storymisstext">{t(ui.story.missText)}</p>
        <button type="button" className="linkbtn" onClick={onBack}>{t(ui.story.missBack)}</button>
      </main>
    )
  }

  const name = t(project.name)
  const sheets = project.gallery.map((src, index) => ({
    src,
    caption: `${name} · ${t(SHEET_LABELS[index % SHEET_LABELS.length])}`
  }))

  if (!story) {
    const order = projects.findIndex((item) => item.id === id)
    const next = projects[(order + 1) % projects.length]
    const facts = [
      [ui.info.type, t(typeLabels[project.type]), false],
      [ui.info.city, t(project.city), false],
      [ui.info.area, `${project.area} ${seatsWord(project.area)}`, true],
      [ui.info.status, t(statusLabels[project.status]), false]
    ]

    return (
      <main className="story story-file">
        <div className="shell storytop">
          <button type="button" className="storyback" onClick={onBack}>
            <span className="backline" aria-hidden="true" />
            <span>{t(ui.story.back)}</span>
          </button>

          <div className="storytitle">
            <span className="overline numeral">
              {String(order + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')} · {project.year}
            </span>
            <h1>{name}</h1>
            <p className="storysub">{t(project.oneLine)}</p>
          </div>

          <div className="storyintro">
            <p className="storylede">{t(project.statement)}</p>
            <dl className="factlist">
              {facts.map(([label, value, numeric]) => (
                <div key={label.en}>
                  <dt>{t(label)}</dt>
                  <dd className={numeric ? 'numeral' : undefined}>{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="shell storybody">
          <figure className="storyfigure storyhero" style={{ aspectRatio: '16 / 9' }}>
            <img
              src={project.main}
              alt={name}
              loading="lazy"
              decoding="async"
              width="2000"
              height="1250"
            />
          </figure>
          <p className="filecaption">
            <span>{name} · {t(typeLabels[project.type])} · {t(project.city)}</span>
            <span className="numeral">{t(statusLabels[project.status])} {project.year}</span>
          </p>
        </div>

        <div className="shell storyfoot">
          <div className="storysheets">
            <DrawingStrip sheets={sheets} title={t(ui.strip.drawings)} compact />
          </div>

          <div className="storyfacts">
            <span className="overline statementhead">{t(ui.info.projectInfo)}</span>
            <InfoTable project={project} />
          </div>
        </div>

        <a className="storynext" href={`#/project/${next.id}`}>
          <span className="shell storynextinner">
            <span className="overline">{t(ui.story.next)}</span>
            <span className="nextname">{t(next.name)}</span>
            <span className="overline numeral">
              {next.year} · {t(typeLabels[next.type])} · {t(statusLabels[next.status])}
            </span>
          </span>
        </a>
      </main>
    )
  }

  const order = featuredIds.indexOf(id)
  const next = featuredIds[(order + 1) % featuredIds.length]
  const nextProject = projects.find((item) => item.id === next)

  return (
    <main className={`story story-${story.layout}`}>
      <div className="shell storytop">
        <button type="button" className="storyback" onClick={onBack}>
          <span className="backline" aria-hidden="true" />
          <span>{t(ui.story.back)}</span>
        </button>

        <div className="storytitle">
          <span className="overline numeral">
            {String(order + 1).padStart(2, '0')} / {String(featuredIds.length).padStart(2, '0')} · {project.year}
          </span>
          <h1>{t(project.name)}</h1>
          <p className="storysub">{t(story.subtitle)}</p>
        </div>

        <div className="storyintro">
          <p className="storylede">{t(story.lede)}</p>
          <dl className="factlist">
            {story.facts.map(([key, value]) => (
              <div key={key.en}>
                <dt>{t(key)}</dt>
                <dd className="numeral">{t(value)}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="shell storybody">
        {story.chapters.map((chapter) => (
          <Plate key={chapter.no} chapter={chapter} layout={story.layout} />
        ))}
      </div>

      <div className="shell storyfoot">
        <div className="storysheets">
          <DrawingStrip sheets={story.sheets} title={t(ui.strip.drawings)} compact />
        </div>

        <div className="storyfacts">
          <span className="overline statementhead">{t(ui.info.projectInfo)}</span>
          <InfoTable project={project} />
        </div>
      </div>

      <a className="storynext" href={`#/project/${next}`}>
        <span className="shell storynextinner">
          <span className="overline">{t(ui.story.next)}</span>
          <span className="nextname">{t(nextProject.name)}</span>
          <span className="overline numeral">
            {nextProject.year} · {t(typeLabels[nextProject.type])} · {t(statusLabels[nextProject.status])}
          </span>
        </span>
      </a>
    </main>
  )
}
