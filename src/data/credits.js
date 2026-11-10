const b = (ru, en) => ({ ru, en })

/** Тарифы — в каркасе тёмной секции «Milestones». Цены в рублях. */
export const tariffs = [
  {
    id: 'month',
    name: b('Месяц', 'Month'),
    price: '2 900 ₽',
    per: b('в месяц', 'per month'),
    features: [
      b('8 встреч клуба', '8 club meetings'),
      b('Разговорные спринты', 'Speaking sprints'),
      b('Чат участников', 'Members chat')
    ],
    featured: false
  },
  {
    id: 'half',
    name: b('Полгода', 'Half a year'),
    price: '14 900 ₽',
    per: b('за 6 месяцев', 'for 6 months'),
    features: [
      b('Всё из «Месяца»', 'Everything in Month'),
      b('2 тематических вечера', '2 themed evenings'),
      b('Записи встреч', 'Meeting recordings')
    ],
    featured: false
  },
  {
    id: 'year',
    name: b('Год', 'Year'),
    price: '24 900 ₽',
    per: b('за 12 месяцев', 'for 12 months'),
    features: [
      b('Всё из «Полугода»', 'Everything in Half-year'),
      b('Личный разбор с DragDealer', 'Personal review with DragDealer'),
      b('Заморозка на месяц', 'One-month freeze')
    ],
    featured: true
  }
]

/* Совместимость со старым импортом, если понадобится */
export const credits = []
export const creditGroups = []
