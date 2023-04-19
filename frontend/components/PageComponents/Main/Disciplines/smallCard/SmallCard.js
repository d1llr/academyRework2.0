import Image from "next/image";
import { useRef } from "react";
import styles from './Small.module.scss';
import Link from "next/link";

const SmallCard = ({ IMG_SRC, text, id}) => {
    // const card = useRef();
    // let CARD_SIZE = 360;
    // const rotation = (evt) => {

    //     const yValue = (evt.nativeEvent.offsetX - (CARD_SIZE / 2)) / (10);
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
            <div className={styles.small_card}>
                <Image src={IMG_SRC}  width={260} height={260} alt="Иконка" />
                <span>
                    {text}
                </span>
            </div>
        </Link>
    );
}

export default SmallCard;