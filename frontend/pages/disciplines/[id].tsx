import { FC } from "react";
import styles from './Disciplines.module.scss'
import { useRouter } from "next/router";
import { useAppSelector } from "../../redux/store";
import Image from "next/image";
import Banner from "../../components/PageComponents/Main/Banner/Banner";
import Gallery from "../../components/PageComponents/Main/Gallery/Gallery";


const Disciplines: FC = () => {
    const router = useRouter()
    const { id } = router.query

    const disciplines = useAppSelector((state) => state.disciplines.find(item => { return item.id == Number(id) }))

    const teacher = useAppSelector((state) => state.teacher.filter(item => {
        return (item.disciplines.map(i => i.name).includes(disciplines?.type))
    }))


    return (
        disciplines ?
            (<main className={styles.disciplines_wrapper}>
                <section className={styles.disciplines_title_container}>
                    <div className={styles.disciplines_title}>
                        <Image src={disciplines.ImageURL + disciplines.ImageType} width={700} height={400} alt="Фото" />
                        <div className={styles.text_wrapper}>
                            <div className={styles.text}>
                                <h1>
                                    {disciplines.name}
                                </h1>
                                <h2>
                                    Продолжительность занятия - {disciplines.lesson_duration}
                                </h2>
                                <p>
                                    {disciplines.description}
                                </p>
                            </div>

                            <button>
                                Записаться <span>на курс</span>
                            </button>
                        </div>
                    </div>
                    <p className={styles.text_small}>
                        {disciplines.description}
                    </p>
                </section>
                <section className={styles.blocks_wrapper}>
                    <h1>
                        На курсе {disciplines.name_sklonenie} вы:
                    </h1>
                    <div className={styles.blocks_container}>
                        {disciplines.skills.map(item => {
                            return <div className={styles.block}>
                                <span>{item}</span>
                            </div>
                        })}

                    </div>
                </section>
                <section className={styles.prices_wrapper}>
                    <h1>
                        Цены
                    </h1>
                    <ul>
                        {disciplines.cost.map(item => {
                            return <li>
                                <span className={styles.text}>
                                    {item.name}
                                </span>
                                <span className={styles.price}>
                                    {item.price}
                                </span>
                            </li>
                        })}
                    </ul>
                    <span className={styles.recomended}>
                        Рекомендуемый курс - {disciplines.recomended_lesson_count} занятий
                    </span>
                </section>
                <section className={styles.teacher_wrapper}>
                    <h1>
                        Преподаватели по актерскому мастерству
                    </h1>
                    <div className={styles.teacher_container}>
                        {
                            teacher.length != 0 ?
                                teacher.map(item => {
                                    return (<div className={styles.teacher}>
                                        <Image src={item.ImageURL + '.png'} width={200} height={200} alt="Фото учителя" />
                                        <span>
                                            {item.fullName}
                                        </span>
                                    </div>)
                                })
                                :
                                <>
                                    <div className={styles.teacher_skeleton}>
                                        <div className={styles.image}></div>
                                        <div className={styles.text}>
                                            <span className={styles.first_line}>
                                            </span>
                                            <span className={styles.second_line}>
                                            </span>
                                        </div>
                                    </div>
                                </>
                        }
                        {/* : ()=>{console.log('teacher false');

                        return <div className={styles.teacher_skeleton}>
                            <div className={styles.image}></div>
                            <span className={styles.first_line}>
                            </span>
                            <span className={styles.first_line}>
                            </span>
                        </div>} */}

                    </div>
                </section>
                <Banner />
            </main>)
            :
            (<div>
                Loading...
            </div>)
    )


}

export default Disciplines;
