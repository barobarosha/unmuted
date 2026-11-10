/**
 * config.js — единственное место для констант проекта Unmuted.
 * На этапе платформы сюда переедут env-настройки.
 */

/**
 * Отправка заявок напрямую из браузера в Telegram Bot API.
 * ВНИМАНИЕ: токен будет виден в исходном коде страницы — это осознанное
 * допущение для MVP. Бот только принимает заявки, ничего не модерирует.
 * На этапе платформы отправка переедет на бэкенд, а ключи — в env.
 */
export const TELEGRAM_BOT = {
  token: 'PASTE_BOT_TOKEN', // TODO: подставить токен бота
  chatId: 'PASTE_CHAT_ID', // TODO: подставить chat_id чата заявок
  api: 'https://api.telegram.org'
}

/** Реквизиты оператора персональных данных (152-ФЗ). Заполняет владелец. */
export const OPERATOR = {
  name: '«_______________» (наименование оператора)',
  inn: '_____________',
  address: '_____________________________',
  email: 'privacy@unmuted.club'
}

/** Ближайшие даты пробных занятий (статика, потом — из БД). */
export const TRIAL_DATES = ['2026-11-14', '2026-11-16', '2026-11-19', '2026-11-21']

export const fmtDate = (iso) =>
  new Date(iso + 'T12:00:00').toLocaleDateString('ru-RU', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  })

/** Отправка заявки в Telegram через Bot API из браузера. */
export async function sendLead(text) {
  const { token, chatId, api } = TELEGRAM_BOT
  const res = await fetch(`${api}/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text, disable_web_page_preview: true })
  })
  if (!res.ok) throw new Error(`telegram ${res.status}`)
  const data = await res.json()
  if (!data.ok) throw new Error('telegram not ok')
  return data
}
