import styles from './About.module.scss';
import H1 from '../../../UniversalComponents/H1/H1.tsx';

const About = () => {
    return (
        <section className={styles.section} id = 'about'>
            <H1 text='О нашей акакадемии' />
            <h1 className={styles.mobileL}>О нас</h1>
            <div className={styles.block}>

                <video src='./about.MOV' controls></video>
                <ul className={styles.text_wrapper}>
                    <li>
                        Уникальный в своем роде проект Академия “Француз”, открывает свои двери для каждого!
                    </li>
                    <li>
                        На одной образовательной площадке собраны разные курсы, которые очень актуальны в наше время.
                    </li>
                    <li>
                        Присоединяйтесь и становитесь лучше вместе с нами!
                    </li>
                </ul>

            </div>
        </section>
    );
}

export default About;