const b = (ru, en) => ({ ru, en })

/** FAQ — в каркасе аккордеона «Notes». date → номер позиции. */
export const notes = [
  {
    id: 'f-1',
    date: '01',
    title: b('Я стесняюсь говорить. Мне можно?', 'I’m shy about speaking. May I?'),
    excerpt: b('Именно для вас клуб и придуман.', 'That is exactly who the club is for.'),
    body: b(
      'Первые встречи проходят в малых группах, ведущий помогает включиться. Зубрить ничего не нужно: приходите и говорите как умеете. Первый круг — всего три фразы о себе, дальше становится легче.',
      'First meetings run in small groups with a host helping you join in. No cramming: come and speak as you can.'
    )
  },
  {
    id: 'f-2',
    date: '02',
    title: b('Какой уровень нужен?', 'What level do I need?'),
    excerpt: b('От A1 до C1 — потоки делятся по уровням.', 'A1 to C1 — groups are split by level.'),
    body: b(
      'Потоки делятся по уровням, так что разговор будет комфортным. Если сомневаетесь, приходите на пробное занятие: определим уровень на месте за пять минут и предложим подходящий поток.',
      'Groups are split by level so conversation stays comfortable. Come to a trial and we will place you in five minutes.'
    )
  },
  {
    id: 'f-3',
    date: '03',
    title: b('Это онлайн или офлайн?', 'Online or offline?'),
    excerpt: b('И то, и другое — формат выбираете при записи.', 'Both — you pick the format when booking.'),
    body: b(
      'Офлайн-встречи проходят в лофте, онлайн-спринты — в видеозвонках. Формат выбираете при записи, переключаться между ними можно в любой момент, подписка действует на оба.',
      'Offline meetings happen in the loft, online sprints over video calls. The subscription covers both.'
    )
  },
  {
    id: 'f-4',
    date: '04',
    title: b('Как отменить или заморозить подписку?', 'How do I cancel or freeze?'),
    excerpt: b('Одним сообщением в Telegram.', 'One Telegram message.'),
    body: b(
      'Напишите нам в Telegram — и всё. Годовая подписка умеет заморозку на месяц, остальное решаем по-человечески: переносы, паузы и возвраты обсуждаются без формальностей.',
      'Message us on Telegram and it is done. The yearly plan includes a one-month freeze.'
    )
  }
]
