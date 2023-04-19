import Image from "next/image";
import { useRef } from "react";
import styles from './Large.module.scss';
import Link from "next/link";


const LargeCard = ({ IMG_SRC, text, resize, id }) => {
    // const card = useRef();
    // let CARD_SIZE = 750;
    // const rotation = (evt) => {

    //     const yValue = (evt.nativeEvent.offsetX - (CARD_SIZE / 2)) / (7);
    //     const xValue = (evt.nativeEvent.offsetY - (CARD_SIZE / 2)) / 5;
    //     card.current.style.transform = `rotateY(${yValue}deg) rotateX(${xValue * -1}deg)`;
    // }

    // const back = (evt) => {
    //     card.current.style.transform = 'rotateX(0) rotateY(0)';
    // }
    return (
        <Link
            href={`/disciplines/${id}`}
            className={styles.card_wrapper}

        // onMouseMove={evt => rotation(evt)}
        // onMouseOut={evt => back(evt)}
        >
            <div
                className={styles.large_card}
            >
                <Image src={IMG_SRC} width={460} height={280} className={styles.original_image} alt="Иконка" />
                <Image src={resize} width={200} height={200} className={styles.resize} alt="Иконка" />

                <span className={styles.actor_span}>
                    {text}
                </span>
            </div>
        </Link>

    );
}

export default LargeCard;