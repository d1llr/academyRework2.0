import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { DisciplinesTypes } from '../types'

interface Idisciplines {
    name: string,
    attr: string
}



export interface ITeacher {
    name: string,
    ImageURL: string,
    fullName: string,
    description: string,
    id: number,
    skills: string[],
    greetings: string,
    disciplines: Array<Idisciplines>,
    unique: string,
    future: string[],

}

const initialState: Array<ITeacher> =
    [
        {
            id: 1,
            name: 'Денис Моисеев',
            fullName: 'Моисеев Денис Борисович',
            ImageURL: '/Teachers/denis',
            description: 'Педагог по актерскому мастерству, степу, клоунаде',
            disciplines: [
                {
                    name: DisciplinesTypes.actor,
                    attr: 'Актерского мастерства'
                },
                {
                    name: DisciplinesTypes.clown,
                    attr: "клоунады"
                },
                {
                    name: DisciplinesTypes.step,
                    attr: 'степа'
                }],
            skills: [
                'Преподаватель актерского мастерства, театральной клоунады, степ.',
                'Действующий актер театра и кино',
                'Опыт преподавания более 10 лет'
            ],
            greetings: 'Всем привет! Я преподаватель актерского мастерства, театральной клоунады и танца степ (чечетка епты) в творческой академии Француз. На своем веку снялся более чем в 100 кинокартинах и 50 театральных постановок таких как: Подсудимый, Лихач, Условный мент, Тайны следствия, Аврора, Чистосердечное призвание-3, Два холма – 2 и др.',
            unique: 'На курсе вы будете участвовать в практических занятиях, импровизациях и получать профессиональные знания и опыт',
            future: [
                'Снимите телесные и речевые зажимы, психологические блоки и неуверенность перед публикой',
                'Научитесь работать в режиме импровизации и разовьете эмоциональный самоконтроль',
                'Улучшите свое настроение и избавитесь от стресса',
                'Раскроете свой потенциал через творчество',
                'Разовьёте эмоциональную гибкость, осознаете свои эмоции и научитесь их выражать',
                'Разовьёте гибкость, баланс, пластичность и координации движений.',
                'Научитесь работать в режиме импровизации и разовьете эмоциональный самоконтроль',
                'Разовьёте навыки быстрой реакции, спонтанности и креативности в импровизационных ситуациях',
                'Поспособствуете развитию укреплению мышц всего тела'
            ]
        },
        {
            id: 2,
            name: 'Срджан Симич',
            fullName: 'Срджан Симич',
            ImageURL: '/Teachers/srdjan',
            description: 'Педагог по актерскому мастерству, сценической речи, пантомимике',
            disciplines: [
                {
                    name: DisciplinesTypes.actor,
                    attr: 'Актерского мастерства'
                },
                {
                    name: DisciplinesTypes.clown,
                    attr: "клоунады"
                },
            ],
            skills: [
                'Преподаватель актерского мастерства и сценической речи',
                'Преподаватель пантомимы',
                'Действующий актер театра и кино',
                'Опыт преподавания 13 лет',
                'Приз за лучшую мужскую роль года 2002'
            ],
            greetings: 'Здравствуйте, меня зовут Срджан, я актер театра и кино, преподаю актерское мастерство и сценическую речь, а также пантомиму в творческой академии Француз и НИУ ВШЭ. Снимался в короткометражных фильмах, таких как: «Гоголь – последние дни», «Золотой Витязь», «Сон смешного человека», «Спасая Комитаса» и др.',
            unique: 'На курсе вы будете участвовать в практических занятиях, импровизациях и получать профессиональные знания и опыт',
            future: [
                'Снимите телесные и речевые зажимы, психологические блоки и неуверенность перед публикой',
                'Улучшите свое настроение и избавитесь от стресса',
                'Научитесь работать в режиме импровизации и разовьете эмоциональный самоконтроль',
                'Научитесь доносить свои мысли с помощью мимики и жестов',
                'Разовьете равновесие, реакцию, станете более подвижным',
                'Познаете возможности своего тела и разума',
                'Разовьете наблюдательность, внимание и память',
                'Раскроете свой потенциал через творчество',
                'Перестанете бояться публики'
            ]
        },
        {
            id: 3,
            name: 'Иван Кирюхин',
            fullName: 'Иван Александрович Кирюхин',
            ImageURL: '/Teachers/ivan',
            description: 'Педагог по актерскому мастерству, ведущему, сценической речи',
            disciplines: [
                {
                    name: DisciplinesTypes.actor,
                    attr: 'Актерского мастерства'
                },
                {
                    name: DisciplinesTypes.vedushii,
                    attr: "школы ведущих"
                }
            ],
            skills: [
                'Преподаватель актерского мастерства и сценической речи.',
                'Преподаватель школы ведущих мероприятий.',
                'Действующий актер театра Штейна',
                'Обладатель премии за лучшую мужскую роль в фестивале «Новый урожай»',
                'Опыт преподавания более 7 лет'
            ],
            greetings: 'Всем здравствуйте! Меня зовут Иван, я, преподаватель школы ведущих, актерского мастерства и сценической речи в творческой академии «Француз». Являюсь действующим актером и снялся уже более чем в 50 эпизодах кино и сериалов таких как: Песнь бездны, Молодые и сильные выживут, Господство, SASPENC и др.',
            unique: 'На курсе вы будете участвовать в практических занятиях, импровизациях и получать профессиональные знания и опыт',
            future: [
                'Снимите телесные и речевые зажимы, психологические блоки и неуверенность перед публикой',
                'Научитесь работать в режиме импровизации ',
                'Улучшите свое настроение и избавитесь от стресса',
                'Раскроете свой потенциал через творчество',
                'Разовьёте эмоциональную гибкость, осознаете свои эмоции и научитесь их выражать',
                'Разовьёте эмоциональный самоконтроль',
                'Научитесь работать в режиме импровизации и разовьете эмоциональный самоконтроль',
                'Поставите свою речь грамотно',
                'Разовьёте навыки быстрой реакции, спонтанности и креативности в импровизационных ситуациях'
            ]
        },
        {
            id: 4,
            name: 'Елена Войницкая',
            fullName: 'Хвойнитская Елена Сергеевна',
            ImageURL: '/Teachers/elena',
            description: 'Педагог по актерскому мастерству, сценической речи, стендапу',
            disciplines: [
                {
                    name: DisciplinesTypes.actor,
                    attr: 'Актерского мастерства'
                },
                {
                    name: DisciplinesTypes.clown,
                    attr: "клоунады"
                },
                {
                    name: DisciplinesTypes.step,
                    attr: "степа"
                }
            ],
            skills: [
                'Преподаватель актерского мастерства, театральной клоунады, степ.',
                'Действующий актер театра и кино',
                'Опыт преподавания более 10 лет'
            ],
            greetings: 'Всем привет! Я преподаватель актерского мастерства, театральной клоунады и танца степ (чечетка епты) в творческой академии Француз. На своем веку снялся более чем в 100 кинокартинах и 50 театральных постановок таких как: Подсудимый, Лихач, Условный мент, Тайны следствия, Аврора, Чистосердечное призвание-3, Два холма – 2 и др.',
            unique: 'Во время каждого занятия, Вам будет предоставлена возможность выйти на сцену и проявить свое творчество в режиме реального времени.',
            future: [
                'Снимите телесные и речевые зажимы, психологические блоки и неуверенность перед публикой',
                'Разовьете наблюдательность, внимание и память',
                'Научитесь работать в режиме импровизации и разовьете эмоциональный самоконтроль',
                'Получите навыки поведения в конфликтных ситуациях',
                'Проработаете лидерские качества в роли режиссера/организатора',
                'Раскроете свой потенциал через творчество',
                'Проработаете этюды с переключением',
                'Научитесь навыкам спонтанного действия в постоянно меняющейся обстановке',
                'Раскроетесь, станете свободнее, раскрепощенее'
            ]
        },
        {
            id: 5,
            name: 'Алиса Мандрик',
            fullName: 'Алиса Мандрик',
            ImageURL: '/Teachers/alisa',
            description: 'Преподаватель актерского мастерства, театральной клоунады, степ.',
            disciplines: [{ name: DisciplinesTypes.vokal, attr: 'по вокалу' }],
            skills: [
                'Педагог по вокалу, инструменталист, композитор',
                'Действующий артист в оркестре ГАЦТК с 2016 года.',
                'Лауреат 1-й и 2-й степени международного конкурса талантов АРТ-ЦЕНТРА',
                'Опыт преподавания более 7-ми лет'
            ],
            greetings: 'Всем привет! Я - ваш преподаватель по вокалу. Здесь, на наших уроках, мы будем исследовать и раскрывать ваше вокальное мастерство, развивать вашу уверенность на сцене и научимся выражать эмоции через музыку. Моя цель - помочь вам раскрыть ваш потенциал и достичь новых высот в вашем вокальном искусстве. Будет много интересных задач, творческих испытаний и вдохновляющих моментов на наших уроках.',
            unique: 'Получите возможность развивать свой голос и музыкальные навыки осваивая различные стили и техники вокального искусства.',
            future: [
                'Разовьете музыкальный слух, чувства ритма, интонации и мелодической линии',
                'Изучите навыки сценического движения, работу над эмоциями и мимикой лица',
                'Расширите  ваш голосовой диапазон',
                'Разовьете разнообразие выразительности в вашем голосе',
                'Обучитесь основам правильного дыхания, поддержки голоса, артикуляции и другим основам вокальной техники',
                'Разовьете свой репертуар и научиться эффективно интерпретировать различные стили и жанры музыки',
                'Проведете терапию связок и голосового аппарата, для всех у кого большая нагрузка на голос',
                'Освоите системное дыхание по различным прогрессивным методикам, в частности Biophonica',
                'Раскроетесь, станете свободнее, раскрепощенее. Получите удовольствие от процесса'
            ]
        },
    ]

export const teacher = createSlice({
    name: 'teacher',
    initialState,
    reducers: {
        // getOneTeacher:(state, PayloadAction) => {
        //     state = state.filter((el)=>{
        //         if(el.id == PayloadAction)
        //     })
        // }
    },
})


export default teacher.reducer