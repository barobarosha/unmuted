import { useCallback, useEffect, useRef, useState } from 'react'
import SiteHead from './sections/SiteHead.jsx'
import Cover from './sections/Cover.jsx'
import FeaturedWorks from './sections/FeaturedWorks.jsx'
import WorkIndex from './sections/WorkIndex.jsx'
import DrawingStrip from './sections/DrawingStrip.jsx'
import Credits from './sections/Credits.jsx'
import Notes from './sections/Notes.jsx'
import Contact from './sections/Contact.jsx'
import SiteFooter from './sections/SiteFooter.jsx'
import ProjectPage from './sections/ProjectPage.jsx'
import PrivacyPage from './sections/PrivacyPage.jsx'
import ToastDock from './parts/Toast.jsx'
import { useRoute, goTo } from './hooks/useRoute.js'
import { useLang } from './i18n/LangContext.jsx'
import { ui } from './i18n/ui.js'
import { studio, chapters } from './data/studio.js'
import { projects } from './data/projects.js'

const b = (ru, en) => ({ ru, en })

/**
 * Архив DragDealer: листы полосы «Drawings».
 * Drag (от dragon) + Dealer (как в картах): дракон раздаёт английский,
 * как дилер раздаёт карты. Это «drag», а не «drug» — шутка именно в этом.
 * Подписи — как у листов архива шаблона.
 */
const SHEETS = [
  { src: 'assets/images/dragon-hero.webp', caption: b('Запись 01 · DragDealer, стойка с указкой', 'Record 01 · DragDealer, pointer stance') },
  { src: 'assets/images/dragon-pointer.webp', caption: b('Запись 02 · первое слово', 'Record 02 · first word') },
  { src: 'assets/images/dragon-tea.webp', caption: b('Запись 03 · DragDealer с чашкой', 'Record 03 · DragDealer with a cup') },
  { src: 'assets/images/dragon-tea.webp', caption: b('Запись 04 · живой диалог', 'Record 04 · live dialogue') },
  { src: 'assets/images/dragon-pointer.webp', caption: b('Запись 05 · «Keep scrolling»', 'Record 05 · «Keep scrolling»') },
  { src: 'assets/images/dragon-hero.webp', caption: b('Запись 06 · свободная речь', 'Record 06 · fluent speech') },
  { src: 'assets/images/dragon-hero.webp', caption: b('Запись 07 · конец вечера', 'Record 07 · evening wrap') },
  { src: 'assets/images/dragon-hero.webp', caption: b('Запись 08 · «Smart move»', 'Record 08 · «Smart move»') }
]

const chapterOf = (id) => chapters.find((item) => item.id === id)

export default function App() {
  const [toasts, setToasts] = useState([])
  const [compact, setCompact] = useState(false)
  const [active, setActive] = useState('')
  const sentinelRef = useRef(null)
  const route = useRoute()
  const { t } = useLang()
  const onProject = route.view === 'project'
  const onPrivacy = route.view === 'privacy'
  const anchor = route.anchor

  const pushToast = useCallback((text) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
    setToasts((prev) => [...prev, { id, text }])
    setTimeout(() => setToasts((prev) => prev.filter((item) => item.id !== id)), 3200)
  }, [])

  useEffect(() => {
    if (onProject) return
    const node = sentinelRef.current
    if (!node) return
    const io = new IntersectionObserver(
      ([entry]) => setCompact(!entry.isIntersecting),
      { rootMargin: '-500px 0px 0px 0px', threshold: 0 }
    )
    io.observe(node)
    return () => io.disconnect()
  }, [onProject])

  useEffect(() => {
    if (onProject || !anchor) return
    const target = document.getElementById(anchor)
    if (!target) return
    const id = requestAnimationFrame(() => target.scrollIntoView({ behavior: 'auto', block: 'start' }))
    return () => cancelAnimationFrame(id)
  }, [onProject, anchor])

  useEffect(() => {
    if (onProject) return
    const sections = chapters
      .map((chapter) => document.getElementById(chapter.id))
      .filter(Boolean)
    if (!sections.length) return
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.6] }
    )
    sections.forEach((section) => io.observe(section))
    return () => io.disconnect()
  }, [onProject])

  const seatsOpen = projects.reduce((sum, item) => sum + item.area, 0)

  const stats = [
    {
      key: 'projects',
      label: t(ui.cover.tallyProjects),
      value: projects.length,
      note: t(ui.cover.tallyProjectsNote)
    },
    {
      key: 'area',
      label: t(ui.cover.tallyArea),
      value: seatsOpen,
      note: t(ui.cover.tallyAreaNote)
    },
    {
      key: 'years',
      label: t(ui.cover.tallyYears),
      value: 24,
      note: t(ui.cover.tallyYearsNote)
    }
  ]

  if (onPrivacy) {
    return (
      <>
        <SiteHead studio={studio} compact onProject active="" />
        <PrivacyPage />
        <SiteFooter studio={studio} />
      </>
    )
  }

  if (onProject) {
    return (
      <>
        <SiteHead studio={studio} compact onProject active="" />
        <ProjectPage id={route.id} onBack={() => goTo('/')} />
        <SiteFooter studio={studio} />
        <ToastDock items={toasts} />
      </>
    )
  }

  return (
    <>
      <SiteHead studio={studio} compact={compact} active={active} />

      <Cover studio={studio} stats={stats} sentinelRef={sentinelRef} />

      <main>
        <FeaturedWorks chapter={chapterOf('featured')} />
        <WorkIndex chapter={chapterOf('work')} />
        <DrawingStrip chapter={chapterOf('drawings')} sheets={SHEETS} />
        <Credits chapter={chapterOf('credits')} />
        <Notes chapter={chapterOf('notes')} />
        <Contact chapter={chapterOf('contact')} studio={studio} pushToast={pushToast} />
      </main>

      <SiteFooter studio={studio} />

      <ToastDock items={toasts} />
    </>
  )
}
