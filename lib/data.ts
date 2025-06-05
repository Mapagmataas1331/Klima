import { Conferences, EnrichedConference, EnrichedConferences, Team } from "./types";

const conferencesList: Conferences = {
  "sibir-ural-dalniy-vostok-2025": {
    // Ключ, латинские буквы без пробелов
    title: "«Сибирь, Урал и Дальний Восток - 2025»", // Название
    subTitle: "Ежегодная конференция по этикету", // Надпись под названием
    date: "", // Дата в формате DD.MM.YYYY
    month: "9", // Месяц (числом) при отсутствии точной датыx
    year: "2025", // Год при отсутствии точной даты
    timeStart: "", // Время начала в формате HH:MM (24-часовой) необязательно
    location: "Новосибирск", // Место проведения (Город)
    address: "", // Адрес места проведения (Улица, дом) необязательно
    description:
      "Трехдневный форум объединит экспертов, преподавателей и всех, кто стремится освоить искусство этикета и межкультурного общения. В программе: закрытые сессии для профессионалов, открытые тренинги, мастер-классы по столовому этикету в ресторане и экскурсия по городу. Участники узнают, как этикет формирует имидж, улучшает коммуникации и даже приносит экономическую выгоду.", // Короткое описание
    content: [
      {
        type: "text",
        text: "Конференция станет ключевой площадкой для обсуждения современных стандартов этикета в России. Ее миссия — укрепить профессиональное сообщество экспертов Сибири, Урала и Дальнего Востока, а также популяризировать этикет как инструмент сохранения национальной культуры.",
      },
      {
        type: "withImg",
        text: "Мероприятие пройдет в три этапа, охватывая как профессиональные, так и общественные аспекты этикета.",
        image: "/conferences/sibir-ural-dalniy-vostok-2025.png",
        imagePosition: "right",
      },
      {
        type: "list",
        title: "Этапы мероприятия",
        items: [
          "День 1: Закрытая сессия для экспертов — разработка стандартов преподавания, обмен опытом, стратегия развития Ассоциации специалистов по этикету.",
          "День 2: Открытые тренинги для всех желающих (светский и деловой этикет, конфликтология), вечерний мастер-класс по столовому этикету для VIP-гостей.",
          "День 3: Экскурсия по Новосибирску — знакомство с туристическим и гастрономическим потенциалом города.",
        ],
      },
      {
        type: "list",
        title: "Цели конференции",
        items: [
          "Создать единые стандарты обучения этикету в РФ.",
          "Повысить статус специалистов по этикету в образовании и бизнесе.",
          "Сделать этикет нормой жизни и элементом национальной идентичности.",
        ],
      },
      {
        type: "withImg",
        text: "Мероприятие будет интересно не только экспертам, но и широкой аудитории, заинтересованной в развитии коммуникативной культуры.",
        image: "/conferences/sibir-ural-dalniy-vostok-2025.png",
        imagePosition: "left",
      },
      {
        type: "list",
        title: "Для кого эта конференция",
        items: [
          "Эксперты и преподаватели этикета",
          "Бизнесмены, госслужащие, HR-специалисты",
          "Все, кто стремится улучшить коммуникативные навыки и произвести впечатление в деловой и светской среде",
        ],
      },
      {
        type: "list",
        title: "Участники получат",
        items: [
          "Практические знания по этикету и межкультурному общению",
          "Сертификаты, нетворкинг с экспертами и VIP-персонами",
          "Возможность присоединиться к профессиональному сообществу",
        ],
      },
      {
        type: "list",
        title: "Ключевые цитаты",
        items: [
          "«Этикет — это не правила, а свобода и комфорт в общении».",
          "«Высокая культура общения экономически выгодна».",
        ],
      },
      {
        type: "text",
        text: "При поддержке Ассоциации специалистов по этикету (https://aspetiquette.ru/).",
      },
      {
        type: "text",
        text: "Успейте зарегистрироваться — ваше первое впечатление должно быть безупречным!",
      },
    ], // система блоков
    team: [
      {
        member: "elena", // остальная информация в teams
        roleHere: "Организатор конференции",
      },
    ], // ведущии и организаторы конференции
    image: "/conferences/sibir-ural-dalniy-vostok-2025.png", // картинка в шапке
  },
  "test-conference-2003": {
    title: "TEST Conference 2003",
    subTitle: "TEST Subtitle - Конференция по тестированию",
    date: "13.12.2003",
    month: "",
    year: "",
    timeStart: "10:00",
    location: "TEST City",
    address: "TEST Street 42",
    description:
      "TEST короткое описание конференции для проверки работы системы. Это тестовые данные с ключевым словом TEST.",
    content: [
      {
        type: "text",
        text: "TEST Полное описание конференции",
      },
      {
        type: "text",
        text: "Город: TEST City",
      },
      {
        type: "text",
        text: "Дата: Декабрь 2003",
      },
    ],
    team: [
      {
        member: "test-member",
        roleHere: "TEST Организатор",
      },
    ],
    image: "",
  },
  "test-conference-2060": {
    title: "TEST Conference 2060",
    subTitle: "TEST Subtitle - Конференция по тестированию",
    date: "19.08.2060",
    month: "",
    year: "",
    timeStart: "10:00",
    location: "TEST City",
    address: "TEST Street 42",
    description:
      "TEST короткое описание конференции для проверки работы системы. Это тестовые данные с ключевым словом TEST.",
    content: [
      {
        type: "text",
        text: "TEST Полное описание конференции",
      },
      {
        type: "text",
        text: "Город: TEST City",
      },
      {
        type: "text",
        text: "Дата: Август 2060",
      },
    ],
    team: [
      {
        member: "test-member",
        roleHere: "TEST Организатор",
      },
      {
        member: "test-member",
        roleHere: "TEST Помошник организатора",
      },
      {
        member: "test-member",
        roleHere: "TEST Спикер",
      },
      {
        member: "test-member",
        roleHere: "TEST Шеф-повар",
      },
      {
        member: "test-member",
        roleHere: "TEST Фотограф",
      },
    ],
    image: "",
  },
};

export const team: Team = {
  elena: {
    name: "Елена Климачкова",
    role: "Организатор конференций",
    aboutList: [
      "Автор и ведущая рубрики «Деловой этикет» на РБК-Новосибирск",
      "Член «Ассоциации специалистов по этикету»",
      "Действующий член «Новосибирского банковского клуба»",
      "Организатор Конкурса Красоты «Мисс/Миссис Финанс»",
      "Обладатель Памятного знака «За труд на благо города» в честь 130-летия Новосибирска.",
      "Тренер по этикету",
    ],
    contacts: [
      "Телефон: +7 (913) 767 64 24",
      "Email: etiket_nesekret@mail.ru",
      "Telegram: @Elena_Klimachkova",
    ],
    image: "/team/elena.jpg",
  },
  tatiana: {
    name: "Татьяна Кильмухаметова",
    role: "Организатор конференций",
    aboutList: [
      "Действующий член «Новосибирского банковского клуба»",
      "Организатор Конкурса Красоты «Мисс/Миссис Финанс»",
    ],
    contacts: ["Телефон: +7 (913) 729 74 42"],
    image: "/team/tatiana.jpg",
  },
  maria: {
    name: "Мария Климачкова",
    role: "Програмист",
    aboutList: ["Создатель сайта"],
    contacts: [],
    image: "/team/maria.jpg",
  },
  "test-member": {
    name: "TEST User",
    role: "Test Organizer",
    aboutList: [
      "TEST - Профессиональный тестировщик",
      "Создатель системы TEST-валидации",
      "Автор книги «TEST-драйв разработки»",
    ],
    contacts: [
      "TEST-телефон: +7 (999) 999-99-99",
      "TEST-email: test@test.ru",
      "TEST-telegram: @test_user",
    ],
    image: "",
  },
};

// -------------------------------------------------------------
const monthNames = [
  "январь",
  "февраль",
  "март",
  "апрель",
  "май",
  "июнь",
  "июль",
  "август",
  "сентябрь",
  "октябрь",
  "ноябрь",
  "декабрь",
];
const monthNamesGenitive = [
  "января",
  "февраля",
  "марта",
  "апреля",
  "мая",
  "июня",
  "июля",
  "августа",
  "сентября",
  "октября",
  "ноября",
  "декабря",
];

const now = new Date();

const enrichedConferences = Object.fromEntries(
  Object.entries(conferencesList).map(([key, conference]) => {
    let dateValue;
    let monthIndex;

    if (conference.date) {
      const [day, month, year] = conference.date.split(".").map(Number);
      monthIndex = month - 1;
      dateValue = new Date(year, monthIndex, day);
    } else {
      const month = parseInt(conference.month, 10);
      const year = parseInt(conference.year, 10);
      monthIndex = month - 1;
      dateValue = new Date(year, monthIndex + 1, 0);
    }

    return [
      key,
      {
        ...conference,
        slug: key,
        dateValue,
        monthName: monthNames[monthIndex] || "",
        monthNameGenitive: monthNamesGenitive[monthIndex] || "",
      },
    ];
  })
);

export const conferences: EnrichedConferences = enrichedConferences;

export const sortedConferences: EnrichedConference[] = Object.values(conferences).sort(
  (a, b) => b.dateValue.getTime() - a.dateValue.getTime()
);

export const upcomingConferences: EnrichedConference[] = Object.values(conferences)
  .filter((conf) => conf.dateValue.getTime() >= now.getTime())
  .sort((a, b) => a.dateValue.getTime() - b.dateValue.getTime());
