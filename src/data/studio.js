const b = (ru, en) => ({ ru, en })

export const studio = {
  name: b('Unmuted', 'Unmuted'),
  discipline: b('Разговорный клуб английского', 'English speaking club'),
  positioning: b(
    'Клуб, где английский говорят, а не зубрят',
    'A club where English is spoken, not crammed'
  ),
  about: b(
    'Живые встречи, живые темы и участники-единомышленники, с которыми хочется разговаривать — сначала по-русски между делом, а через пару месяцев уже по-английски.',
    'Live meetings, live topics and like-minded people you actually want to talk to.'
  ),
  since: 2024,
  email: 'hello@unmuted.club',
  telegram: '@unmuted_club',
  telegramUrl: 'https://t.me/unmuted_club',
  address: b('Лофт «Лавбрю», центр города', 'The loft, city centre'),
  addressAlt: b('Онлайн-спринты в видеозвонках', 'Online sprints over video calls'),
  phone: '+7 900 000-00-00'
}

export const chapters = [
  {
    id: 'featured',
    title: b('Путь', 'The path'),
    guide: {
      ru: 'От первого слова до свободной речи — четыре шага. Листайте вниз: каждый шаг раскрывается как лист архива.',
      en: 'From the first word to free speech — four steps. Scroll to read them in turn.'
    }
  },
  { id: 'work', title: b('Потоки', 'Groups') },
  { id: 'drawings', title: b('DragDealer', 'DragDealer') },
  { id: 'credits', title: b('Тарифы', 'Pricing') },
  { id: 'notes', title: b('FAQ', 'FAQ') },
  { id: 'contact', title: b('Пробное занятие', 'Free trial') }
]
