import H1 from '../../../UniversalComponents/H1/H1.jsx';
import styles from './Disciplines.module.scss';
import SmallCard from "./smallCard/SmallCard.js";
import LargeCard from "./largeCard/LargeCard.js";


// import photos
import web_designer from '../../../../imgs/main/Desciplines/web-designer.png';
import web_programmist from '../../../../imgs/main/Desciplines/web-programmist.png';
import web_programmist_square from '../../../../imgs/main/Desciplines/web-programmist-square.png';
import vedushii from '../../../../imgs/main/Desciplines/vedushii.png';
import bloger from '../../../../imgs/main/Desciplines/bloger.png';
import pantomima from '../../../../imgs/main/Desciplines/pantomima.png';
import pantomima_square from '../../../../imgs/main/Desciplines/pantomima-square.png';
import vokal from '../../../../imgs/main/Desciplines/vokal.png';
import actor from '../../../../imgs/main/Desciplines/actor.png';
import actor_square from '../../../../imgs/main/Desciplines/actor-square.png';
import step from '../../../../imgs/main/Desciplines/step.png';
import clown from '../../../../imgs/main/Desciplines/clown.png';
import barmen from '../../../../imgs/main/Desciplines/barmen.png';
import billiard from '../../../../imgs/main/Desciplines/billiards.png';
import billiard_square from '../../../../imgs/main/Desciplines/billiards-square.png';
import standup from '../../../../imgs/main/Desciplines/standup.png';
import { useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../redux/store';

const Disciplines = () => {
    const seeMore = useRef(null)
    const handleClick = () => {
        seeMore.current.style.height = 'auto'
    }

    const disciplines = useAppSelector((state) => state.disciplines)
    return (
        <section className={styles.disciplines} id="disciplines">
            <h1 className={styles.h1}>Наши дисциплины</h1>
            <h1 className={styles.mobileL}>Дисциплины</h1>
            <div className={styles.disciplines_wrapper} ref={seeMore}>
                {disciplines.map(item => {
                    return item.ImageURLResize ?
                        <LargeCard
                            IMG_SRC={item.ImageURL + item.ImageType}
                            text={item.name}
                            resize={item.ImageURL + item.ImageURLResize + item.ImageType}
                            id={item.id}
                        />
                        :
                        <SmallCard
                            IMG_SRC={item.ImageURL + item.ImageType}
                            text={item.name}
                            id={item.id}
                        />
                })}
                {/* <SmallCard IMG_SRC={web_designer} text={'веб-дизайнер'}/>
                    <SmallCard IMG_SRC={vedushii} text={'ведущий'}/>
                    <LargeCard IMG_SRC={web_programmist} text={'веб-разработчик'} resize = {web_programmist_square}/>
                    <LargeCard IMG_SRC={pantomima} text={'пантомима'} resize = {pantomima_square}/>
                    <SmallCard IMG_SRC={step} text={'ведущий'}/>
                    <SmallCard IMG_SRC={vokal} text={'вокал'} />
                    <SmallCard IMG_SRC={bloger} text={'блогер'} />
                    <SmallCard IMG_SRC={clown} text={'клоунада'} />
                    <LargeCard IMG_SRC={actor} text={'актерская игра'}  resize = {actor_square}/>
                    <LargeCard IMG_SRC={billiard} text={'бильярд'} resize = {billiard_square}/>
                    <SmallCard IMG_SRC={barmen} text={'бармен'}/>
                    <SmallCard IMG_SRC={standup} text={'стендап'} /> */}
            </div>
            <div className={styles.see_more} onClick={() => handleClick()}>
                <span>Смотреть еще</span>
            </div>

        </section>
    );
}

export default Disciplines;