const img = (name) => `assets/images/${name}.webp`
const b = (ru, en) => ({ ru, en })

/**
 * Потоки клуба. Структура повторяет «проекты» шаблона:
 * year → дата старта, type → уровень, area → свободные места.
 * Сейчас статика — на этапе платформы заменится данными из БД.
 */
export const projects = [
  {
    id: 'sprints',
    year: '17.11',
    name: b('Speaking Sprints', 'Speaking Sprints'),
    type: 'a2b1',
    city: b('Онлайн', 'Online'),
    area: 3,
    client: b('Дарья К.', 'Daria K.'),
    structure: b('вт и сб · 19:30', 'Tue & Sat · 19:30'),
    team: b(['Скоростные разминки', 'Тема недели', 'Разбор фраз'], ['Speed warm-ups', 'Topic of the week', 'Phrase clinic']),
    photographer: b('открыта', 'open'),
    status: 'built',
    statement: b(
      'Скоростные разговорные спринты для тех, кто «всё понимает, но молчит». Восемь встреч в месяц, каждая — шесть коротких раундов по две минуты: не успеваешь испугаться, а уже говоришь. Ведущий фиксирует фразы в общий разбор, домашки нет — есть только следующий раунд.',
      'Fast speaking sprints for those who understand everything but stay silent.'
    ),
    oneLine: b('Много речи, мало пауз: шесть двухминутных раундов за вечер', 'More speech, fewer pauses: six two-minute rounds per evening'),
    cover: img('dragon-pointer'),
    main: img('dragon-pointer'),
    gallery: [img('dragon-pointer'), img('dragon-hero'), img('dragon-tea')],
    sortIndex: 0
  },
  {
    id: 'coffee',
    year: '24.11',
    name: b('Coffee & Talk', 'Coffee & Talk'),
    type: 'b1b2',
    city: b('Лофт', 'The loft'),
    area: 2,
    client: b('Игорь М.', 'Igor M.'),
    structure: b('чт · 19:00', 'Thu · 19:00'),
    team: b(['Медленные темы', 'Живые споры', 'Кофе'], ['Slow topics', 'Real debates', 'Coffee']),
    photographer: b('открыта', 'open'),
    status: 'few',
    statement: b(
      'Медленные встречи за кофе в лофте: одна глубокая тема на вечер, никаких таймеров. Говорим о работе, городах, странных привычках и книгах, которые никто не дочитал. Подходит тем, кто уже говорит, но хочет говорить интереснее.',
      'Slow meetings over coffee: one deep topic per evening, no timers.'
    ),
    oneLine: b('Одна глубокая тема на вечер, никаких таймеров', 'One deep topic per evening, no timers'),
    cover: img('dragon-hero'),
    main: img('dragon-hero'),
    gallery: [img('dragon-hero'), img('dragon-tea'), img('dragon-hero')],
    sortIndex: 1
  },
  {
    id: 'debate',
    year: '01.12',
    name: b('Debate Night', 'Debate Night'),
    type: 'b2plus',
    city: b('Лофт', 'The loft'),
    area: 6,
    client: b('Марина Л.', 'Marina L.'),
    structure: b('пт · 20:00', 'Fri · 20:00'),
    team: b(['Аргументы', 'Вежливые перебивания', 'Судейство'], ['Arguments', 'Polite interruptions', 'Judging']),
    photographer: b('открыта', 'open'),
    status: 'built',
    statement: b(
      'Вечерние дебаты: две команды, одна абсурдная резолюция, сорок минут чистой речи. Учимся аргументировать, перебивать вежливо и проигрывать красиво. Уровень B2 и выше — здесь уже не учатся говорить, здесь играют в речь.',
      'Evening debates: two teams, one absurd resolution, forty minutes of pure speech.'
    ),
    oneLine: b('Аргументируй, перебивай вежливо, побеждай', 'Argue, interrupt politely, win'),
    cover: img('dragon-tea'),
    main: img('dragon-tea'),
    gallery: [img('dragon-tea'), img('dragon-hero'), img('dragon-pointer')],
    sortIndex: 2
  },
  {
    id: 'starter',
    year: '08.12',
    name: b('Starter Pack', 'Starter Pack'),
    type: 'a1a2',
    city: b('Онлайн', 'Online'),
    area: 8,
    client: b('Ольга С.', 'Olga S.'),
    structure: b('пн и ср · 18:30', 'Mon & Wed · 18:30'),
    team: b(['Первые фразы', 'Малые группы', 'Поддержка ведущего'], ['First phrases', 'Small groups', 'Host support']),
    photographer: b('открыта', 'open'),
    status: 'built',
    statement: b(
      'Мягкий старт для тех, кто давно учит и никогда не говорит. Малые группы по четыре человека, ведущий рядом, ошибаться не стыдно — стыдно молчать. Через месяц участники Starter Pack переходят в спринты и не возвращаются к зубрёжке.',
      'A soft start for those who have studied for years and never spoken.'
    ),
    oneLine: b('Мягкий старт для тех, кто «всё понимает, но не говорит»', 'A soft start for silent understanders'),
    cover: img('dragon-hero'),
    main: img('dragon-hero'),
    gallery: [img('dragon-hero'), img('dragon-pointer'), img('dragon-hero')],
    sortIndex: 3
  }
]

export const typeLabels = {
  a1a2: b('A1–A2', 'A1–A2'),
  a2b1: b('A2–B1', 'A2–B1'),
  b1b2: b('B1–B2', 'B1–B2'),
  b2plus: b('B2+', 'B2+')
}

export const statusLabels = {
  built: b('набор открыт', 'open'),
  few: b('мало мест', 'few seats')
}
