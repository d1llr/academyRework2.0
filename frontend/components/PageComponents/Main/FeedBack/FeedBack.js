import styles from './FeedBack.module.scss';
import photo from '../../../../public/imgs/main/feedback/que.png'
import Image from 'next/image';


const FeedBack = () => {
    return (
        <section className={styles.feedback_wrapper}>
            <div className={styles.feedback_container}>
                <h1>
                    Остались вопросы?
                </h1>
                <h2>
                    Оставьте свои данные и мы свяжемся с вами в ближайшее время
                </h2>
                <div className={styles.submit_container}>
                    <form>
                        <input type='text' name='name' placeholder='Ваше имя' />
                        <input type='text' name='phone' placeholder='Телефон' />
                    </form>
                    <button>
                        Отправить
                    </button>
                </div>
            </div>
            <div className={styles.photo}>
                <Image src={photo} alt='Вопрос' />
            </div>

        </section>
    );
}

export default FeedBack;