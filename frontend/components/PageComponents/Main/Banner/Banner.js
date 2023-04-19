import styles from './Banner.module.scss';
import IntroBackGround from '../../../UniversalComponents/IntroBackGround/IntroBackGround';
import { useAppDispatch } from '../../../../redux/store';
import { openModal } from '../../../../redux/slices/modalSlice';



const Banner = () => {
    const dispatch = useAppDispatch()
    return (
        <section className={styles.banner_container}>
            <div className={styles.background_wrapper}>
                <div className={styles.IntroBackGround}>
                    <IntroBackGround width={'100vw'} />
                </div>
            </div>
            <h2>
                Приходите на первое занятие
            </h2>
            <h1>бесплатно</h1>
            <button onClick={() => { dispatch(openModal(true)) }}>
                записаться
            </button>
        </section>
    );
}

export default Banner;