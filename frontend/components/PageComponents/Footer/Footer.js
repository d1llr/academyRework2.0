import styles from './Footer.module.scss'
import Image from 'next/image';

import logotype from '../../../public/imgs/Header/logotypewhite.png'
import phone from '../../../public/imgs/Footer/phone.png';
import email from '../../../public/imgs/Footer/email.png'
import adres from '../../../public/imgs/Footer/adres.png'

import frantsuzClub from '../../../public/imgs/Footer/ourcompanies/frantsuz-club.png'
import comicadze from '../../../public/imgs/Footer/ourcompanies/comicadze.png'
import corpPitanie from '../../../public/imgs/Footer/ourcompanies/corp-pitanie.png'
import frantsuzShop from '../../../public/imgs/Footer/ourcompanies/frantsuz-shop.png'
import pouvsegda from '../../../public/imgs/Footer/ourcompanies/pouvsegda.png'
import raiting from '../../../public/imgs/Footer/ourcompanies/raiting.png'
import shashlandia from '../../../public/imgs/Footer/ourcompanies/shashlandia.png'
import tyteda from '../../../public/imgs/Footer/ourcompanies/tyteda.png'
import wetop from '../../../public/imgs/Footer/ourcompanies/wetop.png'
import pominki from '../../../public/imgs/Footer/ourcompanies/pominki.png'


const Footer = () => {
    const data = []

    return (
        <footer className={styles.footer}>
            <div className={styles.upper_line}>
                <div className={styles.logotype_wrapper}>
                    <Image src={logotype} alt='Логотип' width={'auto'} height={'auto'}/>
                </div>
                <div className={styles.main_wrapper}>
                    <div className={styles.block}>
                        <h1>Контакты </h1>
                        <div className={styles.block_wrapper}>
                            <div className={styles.phones}>
                                <Image src={phone}  alt='Телефон'/>
                                <div className={styles.text}>
                                    <span>+7(495) 918-98-07</span>
                                    <span>+7(915) 265-04-25</span>
                                </div>
                                {/* <div className={styles.t_w}>
                                    <Image src={telegram} alt='telegram'/>
                                    <Image src={whatsapp} alt='whatsapp'/>
                                </div> */}
                            </div>
                            <div className={styles.email}>
                                <Image src={email} alt='email'/>
                                <span>academy@frantsuz.ru</span>
                            </div>
                            <div className={styles.adress}>
                                <Image src={adres} alt='adres'/>
                                <span>г. Москва ул. Сталеваров, 14к1</span>
                            </div>
                            {/* <div className={styles.frantsuz}>
                                <span>Развлекательный комплекс “Француз”</span>
                            </div> */}
                            {/* <div className={styles.social}>
                                <Image src={youtube} alt='youtube'/>
                                <Image src={vk} alt='vk'/>
                                <Image src={tiktok} alt='tiktok'/>
                                <Image src={fr} alt='fr'/>
                                <Image src={rutube} alt='rutube'/>
                                <Image src={paykeeper} className={styles.paykeeper} alt='paykeeper'/>
                            </div> */}
                        </div>
                    </div>
                    <div className={styles.projects}>
                        <h1>Наши проекты </h1>
                        <ul>
                            {[...Array(
                                frantsuzClub, 
                                comicadze,
                                corpPitanie,
                                frantsuzShop,
                                pouvsegda,
                                raiting,
                                shashlandia,
                                tyteda,
                                wetop,
                                pominki

                            )].map((item, idx) => {
                                return <li key={idx}><Image src={item} alt='Логотип'/></li>
                            })}
                        </ul>
                    </div>

                </div>
            </div>
            <div className={styles.under_line}>
                <div className={styles.ip}>
                    <p>
                        ИП Авалян В.Г.
                    </p>
                    <p>
                        ИНН: 502807103555
                    </p>
                </div>
                <div className={styles.info}>
                    <p>
                        Не является публичной офертой
                    </p>
                    <p>
                        Политика конфиденциальности
                    </p>
                    <p>
                        Все права защищены
                    </p>
                    <p className={styles.wetop}>
                        Сделано WeTop digital agency 2023
                    </p>
                </div>

            </div>


        </footer>
    );
}

export default Footer;