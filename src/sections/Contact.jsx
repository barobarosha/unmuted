import { useState } from 'react'
import SectionLead from '../parts/SectionLead.jsx'
import { useScrollScene } from '../hooks/useScrollScene.js'
import { useLang } from '../i18n/LangContext.jsx'
import { ui } from '../i18n/ui.js'
import { TRIAL_DATES, fmtDate, sendLead } from '../config.js'
import { tariffs } from '../data/credits.js'

/**
 * «06 / Пробное занятие» — каркас контактной секции шаблона.
 * Форма без бэкенда: отправка заявки в Telegram Bot API из браузера,
 * фолбэк при ошибке — Telegram и почта. Чекбокс согласия на обработку
 * персональных данных обязателен (152-ФЗ).
 */
export default function Contact({ studio, chapter, pushToast }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', date: '', tariff: '', intent: '', consent: false })
  const [sending, setSending] = useState(false)
  const sceneRef = useScrollScene()
  const { t } = useLang()

  const update = (field) => (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    const email = form.email.trim()
    if (!form.name.trim() || !email || !form.phone.trim()) {
      pushToast(t(ui.contact.incomplete))
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      pushToast(t(ui.contact.badMail))
      return
    }
    if (!form.consent) {
      pushToast(t(ui.contact.needConsent))
      return
    }
    const tariffName = form.tariff ? t(tariffs.find((item) => item.id === form.tariff)?.name || '') : ''
    const lines = [
      'Новая заявка Unmuted',
      `Тип: ${form.tariff ? `подписка · ${tariffName}` : 'пробное занятие'}`,
      form.date ? `Дата пробного: ${fmtDate(form.date)}` : null,
      `Имя: ${form.name.trim()}`,
      `E-mail: ${email}`,
      `Телефон: ${form.phone.trim()}`,
      form.intent.trim() ? `Комментарий: ${form.intent.trim()}` : null
    ].filter(Boolean)

    setSending(true)
    try {
      await sendLead(lines.join('\n'))
      pushToast(t(ui.contact.sent))
      setForm({ name: '', email: '', phone: '', date: '', tariff: '', intent: '', consent: false })
    } catch {
      pushToast(t(ui.contact.storeFailed))
    } finally {
      setSending(false)
    }
  }

  const lines = [
    ['email', t(ui.contact.email), null],
    ['studio', t(ui.contact.studio), t(studio.address)],
    ['studioAlt', t(ui.contact.studioAlt), t(studio.addressAlt)],
    ['phone', t(ui.contact.phone), null]
  ]

  return (
    <section className="sectionband contactband scene contactscene" id={chapter.id} ref={sceneRef}>
      <div className="shell sceneholder">
        <SectionLead {...chapter} />

        <div className="contactboard" data-scene-layer="1">
          <div className="contactlist">
            {lines.map(([key, label, value]) => (
              <div className="contactline" key={key}>
                <span className="contactkey">{label}</span>
                <span className={`contactval${key === 'phone' ? ' numeral' : ''}`}>
                  {key === 'email' ? (
                    <a className="mailmark" href={`mailto:${studio.email}`}>{studio.email}</a>
                  ) : key === 'phone' ? (
                    <a className="mailmark" href={studio.telegramUrl} target="_blank" rel="noreferrer">{studio.telegram}</a>
                  ) : (
                    value
                  )}
                </span>
              </div>
            ))}
          </div>

          <form className="enquiryform" onSubmit={onSubmit} noValidate>
            <label>
              {t(ui.contact.name)}
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={update('name')}
                placeholder={t(ui.contact.namePlaceholder)}
                autoComplete="name"
              />
            </label>
            <label>
              {t(ui.contact.mail)}
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={update('email')}
                placeholder={t(ui.contact.mailPlaceholder)}
                autoComplete="email"
              />
            </label>
            <label>
              {t(ui.contact.phoneField)}
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={update('phone')}
                placeholder={t(ui.contact.phonePlaceholder)}
                autoComplete="tel"
              />
            </label>
            <label>
              {t(ui.contact.dateField)}
              <select name="date" value={form.date} onChange={update('date')}>
                <option value="">—</option>
                {TRIAL_DATES.map((d) => (
                  <option key={d} value={d}>{fmtDate(d)}</option>
                ))}
              </select>
            </label>
            <label>
              {t(ui.contact.tariffField)}
              <select name="tariff" value={form.tariff} onChange={update('tariff')}>
                <option value="">—</option>
                {tariffs.map((tariff) => (
                  <option key={tariff.id} value={tariff.id}>{t(tariff.name)} · {tariff.price}</option>
                ))}
              </select>
            </label>
            <label>
              {t(ui.contact.intent)}
              <textarea
                name="intent"
                value={form.intent}
                onChange={update('intent')}
                placeholder={t(ui.contact.intentPlaceholder)}
              />
            </label>
            <label className="consentline">
              <input
                type="checkbox"
                name="consent"
                checked={form.consent}
                onChange={update('consent')}
              />
              <span>
                {t(ui.contact.consent)}{' '}
                <a href="#/privacy">{t(ui.contact.consentLink)}</a>
              </span>
            </label>
            <div className="submitrow">
              <button type="submit" disabled={sending}>
                {sending ? '…' : form.tariff ? t(ui.contact.submitPlan) : t(ui.contact.submitTrial)}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
