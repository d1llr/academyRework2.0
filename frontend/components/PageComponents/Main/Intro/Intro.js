import Image from "next/image";
import styles from './Intro.module.scss';
// import introBackground from '../../../../imgs/main/intro-bg.jpg';
import IntroBackGround from "../../../UniversalComponents/IntroBackGround/IntroBackGround";
import sliding_arrow from '../../../../public/imgs/main/sliding_arrow.png';
import { useAppDispatch } from "../../../../redux/store";
import { openModal } from "../../../../redux/slices/modalSlice";


const Intro = () => {
    const dispatch = useAppDispatch()

    return (
        <section className={styles.intro_wrapper}>
            <div className={styles.background_wrapper}>
                <div className={styles.IntroBackGround}>
                    <IntroBackGround />
                </div>

            </div>

            <div className={styles.intro_text_container}>
                <h1 className={styles.h1}>
                   АКАДЕМИЯ «ФРАНЦУЗ»
                </h1>
                <h2 className={styles.h2}>
                    Курсы, разработанные с учетом потребностей в реалиях 21 века
                </h2>
                <button className={styles.button} onClick={() => { dispatch(openModal()) }}>
                    Записаться  <span> на пробное занятие</span>
                </button>
                <div className={styles.sliding_arrow}>
                    <Image src={sliding_arrow} alt="Стрелка вниз" />
                </div>
            </div>

        </section>
    );
}

export default Intro;