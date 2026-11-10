import { useMemo, useState } from 'react'
import HoverPreview from '../parts/HoverPreview.jsx'
import SectionLead from '../parts/SectionLead.jsx'
import { useScrollScene } from '../hooks/useScrollScene.js'
import { useSwapStage } from '../hooks/useSwapStage.js'
import { ui } from '../i18n/ui.js'
import { useFlipSort } from '../hooks/useFlipSort.js'
import { useLang } from '../i18n/LangContext.jsx'
import { projects, typeLabels, statusLabels } from '../data/projects.js'

const seatsWord = (n) => {
  const m10 = n % 10, m100 = n % 100
  if (m10 === 1 && m100 !== 11) return 'место'
  if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return 'места'
  return 'мест'
}

const COLUMNS = [
  { key: 'year', label: ui.index.colYear, numeric: false },
  { key: 'name', label: ui.index.colName, numeric: false },
  { key: 'type', label: ui.index.colType, numeric: false, small: true },
  { key: 'area', label: ui.index.colArea, numeric: true, small: true, end: true }
]

/* 一页正好占满一屏，滚动推进的是「第几页」 */
const PAGE_SIZE = 6

const chunk = (list, size) => {
  const pages = []
  for (let start = 0; start < list.length; start += size) pages.push(list.slice(start, start + size))
  return pages
}

export default function WorkIndex({ chapter }) {
  const [sortKey, setSortKey] = useState('year')
  const [direction, setDirection] = useState('desc')
  const [hovered, setHovered] = useState(null)
  const sceneRef = useScrollScene()
  const { lang, t } = useLang()
  const { scopeRef, play } = useFlipSort()

  const collator = useMemo(
    () => new Intl.Collator(lang === 'zh' ? 'zh-Hans-CN' : 'en', { sensitivity: 'base' }),
    [lang]
  )

  const ordered = useMemo(() => {
    const factor = direction === 'asc' ? 1 : -1
    return [...projects].sort((a, b) => {
      if (sortKey === 'area') return (a[sortKey] - b[sortKey]) * factor
      if (sortKey === 'year') return collator.compare(a[sortKey], b[sortKey]) * factor
      if (sortKey === 'type') {
        return collator.compare(t(typeLabels[a.type]), t(typeLabels[b.type])) * factor
      }
      return collator.compare(t(a.name), t(b.name)) * factor
    })
  }, [sortKey, direction, collator, t])

  const pages = useMemo(() => chunk(ordered, PAGE_SIZE), [ordered])
  const { stageRef, active, goTo } = useSwapStage(pages.length, {
    viewport: '.workviewport',
    slide: '.workpage',
    rail: '.workprogress',
    tail: 0.16
  })

  const sortedLabel = t(COLUMNS.find((column) => column.key === sortKey).label)
  const announce = t(ui.index.sorted)(sortedLabel, direction, ordered.length)

  const onSort = (key) => {
    play(() => {
      if (key === sortKey) {
        setDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'))
      } else {
        setSortKey(key)
        setDirection(key === 'year' || key === 'area' ? 'desc' : 'asc')
      }
    })
  }

  // 未悬停时默认展示当前排序下的第一个项目，右栏不留空
  const previewProject =
    (hovered && projects.find((item) => item.id === hovered)) || pages[active]?.[0] || ordered[0] || null
  const seatsTotal = ordered.reduce((sum, item) => sum + item.area, 0)

  return (
    <section className="sectionband shell workindex scene workscene" id={chapter.id} ref={sceneRef}>
      <SectionLead {...chapter} />

      <div className="workstage" ref={stageRef} data-scene-layer="1">
        <div className="workviewport">
          <div className="workboard">
            <div className="worktable">
              <div className="colheadrow" role="row">
                {COLUMNS.map((column) => (
                  <button
                    type="button"
                    key={column.key}
                    className={[
                      'colhead',
                      column.small ? 'hideonsmall' : '',
                      column.end ? 'alignend' : '',
                      sortKey === column.key ? 'sorted' : '',
                      sortKey === column.key && direction === 'desc' ? 'desc' : ''
                    ].filter(Boolean).join(' ')}
                    aria-sort={sortKey === column.key ? (direction === 'asc' ? 'ascending' : 'descending') : 'none'}
                    onClick={() => onSort(column.key)}
                  >
                    {t(column.label)}
                    <span className="arrow" aria-hidden="true">↑</span>
                  </button>
                ))}
              </div>

              <div className="workpages" ref={scopeRef}>
                {pages.map((page, pageIndex) => (
                  <div
                    className={`workpage${pageIndex === active ? ' current' : ''}`}
                    key={`page-${pageIndex}`}
                    style={{ zIndex: pages.length - pageIndex }}
                  >
                    {page.map((project) => {
                      return (
                        <div className="rowshell" key={project.id} data-flip={project.id}>
                          <a
                            className={`projectrow${hovered === project.id ? ' active' : ''}`}
                            href={`#/project/${project.id}`}
                            onPointerEnter={(event) => {
                              if (event.pointerType === 'mouse') setHovered(project.id)
                            }}
                            onPointerLeave={(event) => {
                              if (event.pointerType === 'mouse') setHovered((prev) => (prev === project.id ? null : prev))
                            }}
                            onFocus={() => setHovered(project.id)}
                            onBlur={() => setHovered((prev) => (prev === project.id ? null : prev))}
                          >
                            <span className="rowyear numeral">{project.year}</span>
                            <span className="rowname">
                              <span className="rowmark" aria-hidden="true" />
                              {t(project.name)}
                              {project.status !== 'built' ? (
                                <span className="rowflag">{t(statusLabels[project.status])}</span>
                              ) : null}
                            </span>
                            <span className="hideonsmall">
                              <span className="rowtype">{t(typeLabels[project.type])}</span>
                            </span>
                            <span className="hideonsmall rowarea numeral">
                              {project.area}
                              <span className="unit">{seatsWord(project.area)}</span>
                            </span>
                          </a>
                        </div>
                      )
                    })}
                  </div>
                ))}
              </div>

              <div className="workrail">
                <span className="workprogress" aria-hidden="true">
                  <span className="progressfill" />
                </span>

                <div className="workticks" role="tablist" aria-label={t(chapter.title)}>
                  {pages.map((page, pageIndex) => (
                    <button
                      type="button"
                      key={`tick-${pageIndex}`}
                      className={`worktick${pageIndex === active ? ' current' : ''}`}
                      role="tab"
                      aria-selected={pageIndex === active}
                      onClick={() => goTo(pageIndex)}
                    >
                      <span className="overline numeral">{String(pageIndex + 1).padStart(2, '0')}</span>
                      <span className="tickline" aria-hidden="true" />
                      <span className="sronly">{t(ui.index.pageAria)(pageIndex + 1, pages.length)}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="indexfoot">
                <span className="overline numeral">{t(ui.index.countLine)(ordered.length, seatsTotal)}</span>
              </div>
            </div>

            <HoverPreview project={previewProject} />
          </div>
        </div>
      </div>

      <p className="sronly" aria-live="polite">{announce}</p>
    </section>
  )
}
