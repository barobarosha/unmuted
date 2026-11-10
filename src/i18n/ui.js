const b = (ru, en) => ({ ru, en })

/** 界面固定文案。数据内容的文案写在各 data 文件里 */
export const ui = {
  nav: {
    featured: b('Путь', 'Path'),
    work: b('Потоки', 'Groups'),
    drawings: b('DragDealer', 'DragDealer'),
    credits: b('Тарифы', 'Pricing'),
    notes: b('FAQ', 'FAQ'),
    contact: b('Пробное', 'Trial')
  },
  cover: {
    tallyProjects: b('Потоки в наборе', 'Open groups'),
    tallyProjectsNote: b('онлайн и в лофте', 'online and in the loft'),
    tallyArea: b('Участников говорит', 'Speakers'),
    tallyAreaNote: b('человек уже разговорились', 'already talking'),
    tallyYears: b('Встреч в месяц', 'Meetings / month'),
    tallyYearsNote: b('спринты, дебаты, кофе-токи', 'sprints, debates, coffee talks')
  },
  index: {
    colYear: b('Старт', 'Starts'),
    colName: b('Поток', 'Group'),
    colType: b('Уровень', 'Level'),
    colArea: b('Свободно', 'Seats'),
    previewMeta: b(
      'Наведите на строку — увидите, о чём говорят в этом потоке.',
      'Hover a row to see what the group talks about.'
    ),
    pageAria: b((n, total) => `Страница ${n} из ${total}`, (n, total) => `Page ${n} of ${total}`),
    countLine: b((n, s) => `${n} потока · свободно ${s} мест`, (n, s) => `${n} groups · ${s} seats open`),
    sorted: {
      ru: (col, dir, n) => `Сортировка: ${col}, ${dir === 'asc' ? 'по возрастанию' : 'по убыванию'}, ${n} позиций`,
      en: (col, dir, n) => `Sorted by ${col.toLowerCase()}, ${dir === 'asc' ? 'ascending' : 'descending'}, ${n} groups`
    }
  },
  strip: {
    hint: b('Тяните или листайте', 'Drag or swipe'),
    count: b((n) => `${n} записей`, (n) => `${n} records`),
    drawings: b('Архив', 'Archive'),
    aria: b('Архив листается горизонтально: тяните или используйте стрелки', 'Archive scrolls sideways; drag or use the arrow keys')
  },
  info: {
    type: b('Уровень', 'Level'),
    city: b('Формат', 'Format'),
    area: b('Свободные места', 'Seats open'),
    client: b('Ведущий', 'Host'),
    structure: b('Расписание', 'Schedule'),
    status: b('Статус', 'Status'),
    team: b('Темы', 'Topics'),
    photographer: b('Запись', 'Enrolment'),
    projectInfo: b('Карточка потока', 'Group data')
  },
  credits: {
    practice: b('Подписка', 'Subscription'),
    award: b('Что входит', 'Included'),
    exhibition: b('Условия', 'Terms'),
    asideAlt: b('DragDealer с чашкой — запись из архива клуба', 'DragDealer with a cup — club archive record')
  },
  contact: {
    email: b('Почта', 'Email'),
    studio: b('Лофт', 'Loft'),
    studioAlt: b('Онлайн', 'Online'),
    phone: b('Telegram', 'Telegram'),
    name: b('Имя', 'Name'),
    mail: b('E-mail', 'Email'),
    phoneField: b('Телефон', 'Phone'),
    dateField: b('Дата занятия', 'Date'),
    tariffField: b('Тариф', 'Plan'),
    intent: b('Комментарий', 'Comment'),
    namePlaceholder: b('Как к вам обращаться', 'How should we address you'),
    mailPlaceholder: b('you@example.com', 'you@example.com'),
    phonePlaceholder: b('+7 ___ ___-__-__', '+7 ___ ___-__-__'),
    intentPlaceholder: b('Уровень, цель, пожелания — в одну строку', 'Level, goal, wishes — one line'),
    consent: b('Я согласен на обработку персональных данных согласно', 'I agree to the processing of personal data per the'),
    consentLink: b('политике обработки ПД', 'privacy policy'),
    submitTrial: b('Записаться бесплатно', 'Book a free trial'),
    submitPlan: b('Отправить заявку', 'Send request'),
    badMail: b('Проверьте адрес почты — в нём ошибка', 'That email address looks wrong — please check it'),
    incomplete: b('Заполните имя, e-mail и телефон', 'Please fill in name, email and phone'),
    needConsent: b('Нужно согласие на обработку персональных данных', 'Consent to data processing is required'),
    sent: b('Заявка отправлена! Мы напишем вам в течение дня', 'Request sent! We will write back within a day'),
    storeFailed: b('Не получилось отправить — напишите нам напрямую: @unmuted_club', 'Could not send — message us directly: @unmuted_club')
  },
  story: {
    back: b('Все потоки', 'All groups'),
    next: b('Следующий поток', 'Next group'),
    missTitle: b('Нет такого потока', 'No such group'),
    missText: b('Поток не найден или уже набран — смотрите полный список.', 'That group does not exist or is full.'),
    missBack: b('К списку потоков', 'Back to groups'),
    notFound: b('Поток не найден', 'Group not found'),
    cta: b('Записаться в поток', 'Join this group')
  },
  featured: {
    hint: b('Листайте дальше', 'Keep scrolling'),
    viewProject: b('Подробнее', 'Read more'),
    ofIndex: b((i, n) => `${i} / ${n}`, (i, n) => `${i} / ${n}`)
  },
  head: {
    nav: b('Навигация по разделам', 'Section navigation'),
    home: b('На главную', 'Back to home')
  }
}
