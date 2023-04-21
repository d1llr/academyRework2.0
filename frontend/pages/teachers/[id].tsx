import { FC } from "react";
import styles from './Teachers.module.scss'
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import Image from "next/image";
import actorIcon from '../../public/imgs/icons/actor_icon.png'
import { openModal } from "../../redux/slices/modalSlice";


const Teacher: FC<any> = () => {
    const router = useRouter()
    const { id } = router.query


    const teacher = useAppSelector((state) => state.teacher.find(item => { return item.id == Number(id) }))
    const dispatch = useAppDispatch()

    ///
    return (
        teacher ?
            <main className={styles.teachers_wrapper}>
                <div className={styles.teachers_container}>
                    <div className={styles.fullname_skills}>
                        <h1>{teacher.fullName}</h1>
                        <ul>
                            {teacher.skills.map(item => {
                                return <li>
                                    <Image src={actorIcon} width={23} height={23} alt="actor icon" />
                                    <span>{item}</span>
                                </li>
                            })}
                        </ul>
                    </div>
                    <div className={styles.image_block}>
                        <Image src={teacher.ImageURL + 'Large.jpg'} alt="Фото учителя" width={606} height={478} />
                        <h3>
                            <div className={styles.line}></div>
                            {teacher.greetings}
                        </h3>
                    </div>
                </div>
                <h3 className={styles.greeting_small}>
                    <div className={styles.line}></div>
                    {teacher.greetings}
                </h3>
                <div className={styles.unique_wrapper}>
                    <span>
                        {teacher.unique}
                    </span>
                </div>
                <div className={styles.blocks_wrapper}>
                    <h1>
                        На курсе {teacher.disciplines.map(item => {
                            return item.attr + ', '
                        })}
                        вы:
                    </h1>
                    <div className={styles.blocks_container}>
                        {teacher.future.map(item => {
                            return <div className={styles.block}><span>{item}</span></div>
                        })}
                    </div>
                    <div className={styles.buttons_wrapper}>
                        <button onClick={()=>dispatch(openModal(true))}>
                            Записаться на курс
                        </button>
                        
                    </div>
                </div>
            </main>
            :
            <div>
                Loading...
            </div>
    );
}


export default Teacher;
