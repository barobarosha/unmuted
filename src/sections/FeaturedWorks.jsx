import SectionLead from '../parts/SectionLead.jsx'
import { useFeaturedStage } from '../hooks/useFeaturedStage.js'
import { useLang } from '../i18n/LangContext.jsx'
import { ui } from '../i18n/ui.js'
import { steps, featuredShots } from '../data/stories.js'

/**
 * «01 / Путь» — закреплённая сцена шаблона (Selected works),
 * в которой вместо проектов листаются четыре шага пути ученика.
 * Каркас и поведение сцены не менялись — только контент слайдов.
 */
function Slide({ step, order, total }) {
  const { t } = useLang()
  const shot = featuredShots[step.id]
  const name = t(step.name)

  return (
    <article
      className={`featuredslide${order % 2 ? ' flipped' : ''}`}
      style={{ '--depth': total - order, zIndex: order + 1 }}
    >
      <a className="featuredfigure" href="#contact" aria-label={name} tabIndex={-1}>
        <span className="featuredplate">
          <img
            src={shot.main}
            alt={t(shot.mainAlt)}
            width="1600"
            height="1000"
            loading={order === 0 ? 'eager' : 'lazy'}
            decoding="async"
          />
        </span>
        <span className="featuredinset">
          <img
            src={shot.inset}
            alt={t(shot.insetAlt)}
            width="800"
            height="1000"
            loading="lazy"
            decoding="async"
          />
        </span>
      </a>

      <div className="featuredmeta">
        <span className="overline numeral featuredcount">
          {t(ui.featured.ofIndex)(String(order + 1).padStart(2, '0'), String(total).padStart(2, '0'))}
        </span>

        <h3 className="featuredname">{name}</h3>

        <p className="featuredline">{t(step.oneLine)}</p>

        <dl className="featuredfacts">
          {step.facts.map(([label, value, numeric]) => (
            <div key={t(label)}>
              <dt className="overline">{t(label)}</dt>
              <dd className={numeric ? 'numeral' : undefined}>{t(value)}</dd>
            </div>
          ))}
        </dl>

        <a className="featuredcta" href="#contact">
          <span>{t(ui.featured.viewProject)}</span>
          <span className="ctaline" aria-hidden="true" />
        </a>
      </div>
    </article>
  )
}

export default function FeaturedWorks({ chapter }) {
  const { t } = useLang()
  const list = steps
  const { stageRef, active, goTo } = useFeaturedStage(list.length)

  return (
    <section className="sectionband shell featuredband" id={chapter.id}>
      <SectionLead {...chapter} />

      <div className="featuredstage" ref={stageRef}>
        <div className="featuredviewport">
          <div className="featuredframe">
            {list.map((step, index) => (
              <Slide key={step.id} step={step} order={index} total={list.length} />
            ))}
          </div>

          <div className="featuredrail">
            <span className="featuredprogress" aria-hidden="true">
              <span className="progressfill" />
            </span>

            <div className="featuredticks" role="tablist" aria-label={t(chapter.title)}>
              {list.map((step, index) => (
                <button
                  type="button"
                  key={step.id}
                  className={`featuredtick${index === active ? ' current' : ''}`}
                  role="tab"
                  aria-selected={index === active}
                  onClick={() => goTo(index)}
                >
                  <span className="overline numeral">{String(index + 1).padStart(2, '0')}</span>
                  <span className="tickline" aria-hidden="true" />
                  <span className="sronly">{t(step.name)}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <p className="sronly" aria-live="polite">
        {t(ui.featured.ofIndex)(String(active + 1).padStart(2, '0'), String(list.length).padStart(2, '0'))}
        {' · '}
        {t(list[active]?.name)}
      </p>
    </section>
  )
}
