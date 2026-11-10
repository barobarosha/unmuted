const img = (name) => `assets/images/${name}.webp`
const b = (ru, en) => ({ ru, en })

/**
 * Четыре шага «Пути» — контент для закреплённой сцены featured
 * (у шаблона это «Selected works»). Каркас сцены не менялся,
 * меняется только содержимое слайдов.
 */
export const steps = [
  {
    id: 'step-01',
    no: '01',
    name: b('Первое слово', 'First word'),
    oneLine: b('Приходишь на пробную встречу и говоришь первое предложение', 'You come to a trial meeting and say your first sentence'),
    text: b(
      'Не идеально — живо. Ведущий встречает, группа маленькая, первый круг — три фразы о себе. Остальное догоним.',
      'Not perfect — alive. The host greets you, the group is small, the first round is three phrases about yourself.'
    ),
    facts: [
      [b('Шаг', 'Step'), '01', true],
      [b('Формат', 'Format'), b('пробная встреча', 'trial meeting'), false],
      [b('Длительность', 'Length'), b('60 минут', '60 minutes'), false],
      [b('Цена', 'Price'), b('бесплатно', 'free'), false]
    ]
  },
  {
    id: 'step-02',
    no: '02',
    name: b('Толпа без учебников', 'A crowd without textbooks'),
    oneLine: b('Никакой зубрёжки: живые темы, игры и споры', 'No cramming: live topics, games and arguments'),
    text: b(
      'Учебники остаются дома. Каждая встреча — тема, игра или спор: английский здесь повод собраться, а не предмет.',
      'Textbooks stay home. Every meeting is a topic, a game or an argument: English is the excuse to gather.'
    ),
    facts: [
      [b('Шаг', 'Step'), '02', true],
      [b('Формат', 'Format'), b('встречи клуба', 'club meetings'), false],
      [b('Длительность', 'Length'), b('8 встреч в месяц', '8 meetings a month'), false],
      [b('Учебники', 'Textbooks'), b('не нужны', 'none'), false]
    ]
  },
  {
    id: 'step-03',
    no: '03',
    name: b('Свои люди', 'Your people'),
    oneLine: b('Единомышленники, которые тоже пришли говорить', 'Like-minded people who also came to talk'),
    text: b(
      'Ошибаться здесь не стыдно — стыдно молчать. Через пару встреч группа становится своей компанией, куда хочется возвращаться.',
      'Mistakes are not embarrassing here — silence is. After a couple of meetings the group becomes your crowd.'
    ),
    facts: [
      [b('Шаг', 'Step'), '03', true],
      [b('Формат', 'Format'), b('постоянная группа', 'steady group'), false],
      [b('Размер', 'Size'), b('4–8 человек', '4–8 people'), false],
      [b('Чат', 'Chat'), b('общий Telegram', 'shared Telegram'), false]
    ]
  },
  {
    id: 'step-04',
    no: '04',
    name: b('Свободная речь', 'Free speech'),
    oneLine: b('Через пару месяцев ловишь себя на мысли по-английски', 'In a couple of months you catch yourself thinking in English'),
    text: b(
      'Это и был план: не «выучить язык», а начать им жить. Дальше — дебаты, спринты и новые темы, сколько захочется.',
      'That was the plan: not to «learn the language» but to start living in it.'
    ),
    facts: [
      [b('Шаг', 'Step'), '04', true],
      [b('Формат', 'Format'), b('любые потоки', 'any group'), false],
      [b('Горизонт', 'Horizon'), b('2–3 месяца', '2–3 months'), false],
      [b('Дальше', 'Next'), b('дебаты и спринты', 'debates and sprints'), false]
    ]
  }
]

export const featuredIds = steps.map((s) => s.id)

/** Слайды сцены: основная плашка-чертёж + врезка с драконом */
export const featuredShots = {
  'step-01': {
    main: img('dragon-pointer'),
    mainAlt: b('DragDealer у доски — архивная запись 01', 'DragDealer at the board — archive record 01'),
    inset: img('dragon-pointer'),
    insetAlt: b('DragDealer с указкой — архивная запись 01', 'DragDealer with a pointer — archive record 01')
  },
  'step-02': {
    main: img('dragon-hero'),
    mainAlt: b('DragDealer приветствует — архивная запись 02', 'DragDealer welcomes — archive record 02'),
    inset: img('dragon-hero'),
    insetAlt: b('DragDealer стоит — архивная запись 02', 'DragDealer standing — archive record 02')
  },
  'step-03': {
    main: img('dragon-tea'),
    mainAlt: b('DragDealer с чашкой — архивная запись 03', 'DragDealer with a cup — archive record 03'),
    inset: img('dragon-tea'),
    insetAlt: b('DragDealer с чашкой — архивная запись 03', 'DragDealer with a cup — archive record 03')
  },
  'step-04': {
    main: img('dragon-hero'),
    mainAlt: b('DragDealer указывает вперёд — архивная запись 04', 'DragDealer pointing forward — archive record 04'),
    inset: img('dragon-pointer'),
    insetAlt: b('DragDealer указывает вперёд — архивная запись 04', 'DragDealer pointing ahead — archive record 04')
  }
}

/**
 * Карточки потоков (страницы #/project/<id>). Layout шаблона сохранён,
 * тексты — описания форматов встреч.
 */
export const stories = {
  sprints: {
    layout: 'ladder',
    subtitle: b('Шесть двухминутных раундов за вечер', 'Six two-minute rounds per evening'),
    lede: b(
      'Speaking Sprints — тренажёр речи, а не урок. Ведущий задаёт тему и запускает таймер: две минуты говоришь ты, две минуты — партнёр, затем смена пары. За вечер проходит шесть раундов, и к третьему страх говорить просто не успевает за темпом.',
      'Speaking Sprints is a speech gym, not a lesson.'
    ),
    facts: [
      [b('Уровень', 'Level'), b('A2–B1', 'A2–B1')],
      [b('Формат', 'Format'), b('онлайн, видеозвонок', 'online video call')],
      [b('Расписание', 'Schedule'), b('вт и сб · 19:30', 'Tue & Sat · 19:30')],
      [b('Размер группы', 'Group size'), b('до 8 человек', 'up to 8')],
      [b('Домашка', 'Homework'), b('нет', 'none')]
    ],
    chapters: [
      {
        no: '01',
        title: b('Темп вместо страха', 'Pace instead of fear'),
        text: b(
          'Две минуты — это мало, и это специально. Не успеваешь построить идеальную фразу, поэтому строишь живую. Ошибки фиксирует ведущий, разбираем их в конце, не прерывая раунды.',
          'Two minutes is short on purpose: no time for a perfect phrase, so you build a live one.'
        ),
        image: img('dragon-pointer'),
        ratio: '16 / 9',
        alt: b('DragDealer в раунде', 'DragDealer in a round'),
        span: 'wide'
      },
      {
        no: '02',
        title: b('Смена пар', 'Rotating pairs'),
        text: b(
          'Каждый раунд — новый собеседник. Акценты, темпы и характеры разные, и именно это учит понимать на слух, а не по субтитрам.',
          'Every round brings a new partner: different accents, tempi and characters.'
        ),
        image: img('dragon-tea'),
        ratio: '3 / 2',
        alt: b('DragDealer и участники', 'DragDealer and participants'),
        span: 'normal'
      }
    ],
    sheets: [
      { src: img('dragon-pointer'), caption: b('DragDealer · старт спринта', 'DragDealer · sprint start') },
      { src: img('dragon-tea'), caption: b('DragDealer · смена пар', 'DragDealer · pair rotation') },
      { src: img('dragon-hero'), caption: b('DragDealer · конец вечера', 'DragDealer · end of evening') }
    ]
  },
  coffee: {
    layout: 'column',
    subtitle: b('Одна глубокая тема на вечер', 'One deep topic per evening'),
    lede: b(
      'Coffee & Talk — медленный формат в лофте. Никаких таймеров и раундов: одна тема, одна чашка, полтора часа разговора. Темы объявляем заранее в чате — от «городов, где хочется жить» до «почему все делают вид, что дочитали Пруста».',
      'Coffee & Talk is the slow format: one topic, one cup, ninety minutes of conversation.'
    ),
    facts: [
      [b('Уровень', 'Level'), b('B1–B2', 'B1–B2')],
      [b('Формат', 'Format'), b('лофт, за большим столом', 'loft, one big table')],
      [b('Расписание', 'Schedule'), b('чт · 19:00', 'Thu · 19:00')],
      [b('Размер группы', 'Group size'), b('до 6 человек', 'up to 6')]
    ],
    chapters: [
      {
        no: '01',
        title: b('Глубина вместо темпа', 'Depth instead of pace'),
        text: b(
          'Здесь учатся говорить длинно: разворачивать мысль, уточнять, спорить. Ведущий держит тему и подбрасывает слова, которых не хватает.',
          'Here you learn to speak at length: unfold a thought, clarify, argue.'
        ),
        image: img('dragon-hero'),
        ratio: '2 / 3',
        alt: b('DragDealer · длинный монолог', 'DragDealer · long monologue'),
        span: 'tall'
      }
    ],
    sheets: [
      { src: img('dragon-hero'), caption: b('DragDealer · тема вечера', 'DragDealer · evening topic') },
      { src: img('dragon-tea'), caption: b('DragDealer · разговор за столом', 'DragDealer · table talk') }
    ]
  },
  debate: {
    layout: 'plate',
    subtitle: b('Две команды и одна абсурдная резолюция', 'Two teams and one absurd resolution'),
    lede: b(
      'Debate Night — игра в речь для уверенных. Резолюция объявляется за пять минут до начала, позицию вытягивают жребием: придётся защищать то, во что не веришь. Сорок минут чистой речи, судья — DragDealer.',
      'Debate Night is a speech game for the confident: forty minutes of pure talk.'
    ),
    facts: [
      [b('Уровень', 'Level'), b('B2+', 'B2+')],
      [b('Формат', 'Format'), b('лофт, две команды', 'loft, two teams')],
      [b('Расписание', 'Schedule'), b('пт · 20:00', 'Fri · 20:00')],
      [b('Раунды', 'Rounds'), b('3 × 12 минут', '3 × 12 minutes')]
    ],
    chapters: [
      {
        no: '01',
        title: b('Защищай то, во что не веришь', 'Defend what you don’t believe'),
        text: b(
          'Жребий решает всё — и это лучшая тренировка аргументации. Когда позиция не твоя, работает только язык.',
          'The draw decides everything — the best argumentation training there is.'
        ),
        image: img('dragon-hero'),
        ratio: '16 / 9',
        alt: b('DragDealer · аргументация раунда', 'DragDealer · round argumentation'),
        span: 'wide'
      }
    ],
    sheets: [
      { src: img('dragon-hero'), caption: b('DragDealer · длинный раунд', 'DragDealer · long round') },
      { src: img('dragon-pointer'), caption: b('DragDealer · живая реплика', 'DragDealer · live line') }
    ]
  },
  starter: {
    layout: 'ladder',
    subtitle: b('Малые группы и ведущий рядом', 'Small groups with a host nearby'),
    lede: b(
      'Starter Pack — вход для тех, кто годами учит и молчит. Группы по четыре человека, первые встречи — с опорными карточками, ведущий переводит только когда совсем застряли. Через месяц — переход в спринты.',
      'Starter Pack is the entry point for silent learners: groups of four, cue cards, a host who helps.'
    ),
    facts: [
      [b('Уровень', 'Level'), b('A1–A2', 'A1–A2')],
      [b('Формат', 'Format'), b('онлайн, малые группы', 'online, small groups')],
      [b('Расписание', 'Schedule'), b('пн и ср · 18:30', 'Mon & Wed · 18:30')],
      [b('Размер группы', 'Group size'), b('4 человека', '4 people')]
    ],
    chapters: [
      {
        no: '01',
        title: b('Три фразы о себе', 'Three phrases about yourself'),
        text: b(
          'Первая встреча всегда одинакова: три фразы о себе. К концу месяца эти же люди спорят о фильмах. Прогресс измеряем не тестами, а минутами чистой речи.',
          'The first meeting is always the same: three phrases about yourself. A month later these people argue about films.'
        ),
        image: img('dragon-pointer'),
        ratio: '16 / 9',
        alt: b('DragDealer · первые фразы', 'DragDealer · first phrases'),
        span: 'wide'
      }
    ],
    sheets: [
      { src: img('dragon-pointer'), caption: b('Первые фразы · неделя 1', 'First phrases · week 1') },
      { src: img('dragon-hero'), caption: b('Рост речи за месяц', 'Speech growth over a month') }
    ]
  }
}
