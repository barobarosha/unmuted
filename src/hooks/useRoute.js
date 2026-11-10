import { useEffect, useState } from 'react'

const parse = () => {
  const raw = window.location.hash.replace(/^#/, '')
  if (raw.startsWith('/project/')) return { view: 'project', id: raw.slice('/project/'.length) }
  if (raw === '/privacy' || raw === 'privacy') return { view: 'privacy', anchor: '' }
  if (raw.startsWith('/')) return { view: 'home', anchor: raw.slice(1) }
  return { view: 'home', anchor: raw }
}

/** 极简哈希路由：作品详情页走 #/project/<id>，其余留给同页锚点 */
export function useRoute() {
  const [route, setRoute] = useState(() =>
    typeof window === 'undefined' ? { view: 'home', anchor: '' } : parse()
  )

  useEffect(() => {
    const onHash = () => setRoute(parse())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  return route
}

export function goTo(path) {
  window.location.hash = path
}
