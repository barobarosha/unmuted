import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

const STORE_KEY = 'unmuted-lang'
const LangContext = createContext({ lang: 'zh', setLang: () => {}, t: (value) => value })

const detect = () => 'ru' // интерфейс фиксирован: русский

export function LangProvider({ children }) {
  const [lang, setLang] = useState(detect)

  useEffect(() => {
    document.documentElement.lang = 'ru'
    document.documentElement.dataset.lang = lang
    try {
      localStorage.setItem(STORE_KEY, lang)
    } catch {
      /* 偏好写入失败不影响切换 */
    }
  }, [lang])

  /** 取值：双语对象取当前语言，普通值原样返回 */
  const t = useCallback(
    (value) => {
      if (value && typeof value === 'object' && !Array.isArray(value)) {
        return value[lang] ?? value.ru ?? value.en ?? value.zh
      }
      return value
    },
    [lang]
  )

  const value = useMemo(() => ({ lang, setLang, t }), [lang, t])

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

export function useLang() {
  return useContext(LangContext)
}
