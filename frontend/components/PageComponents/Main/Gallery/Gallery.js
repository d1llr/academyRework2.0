import H1 from '../../../UniversalComponents/H1/H1.tsx';
import Slider from "../../../UniversalComponents/Slider/Slider.js";
import styles from './Gallery.module.scss';
import slide from '../../../../public/imgs/Slider/slide-1.jpg';
import Image from "next/image";
const Gallery = () => {
    return (
        <section className={styles.gallery}>
            <h1 className={styles.h1}>Галерея</h1>
            <Slider>
                <div className="keen-slider__slide number-slide1"> <Image src={slide} alt='Слайд' /></div>
                <div className="keen-slider__slide number-slide2"> <Image src={slide} alt='Слайд' /></div>
                <div className="keen-slider__slide number-slide3"> <Image src={slide} alt='Слайд' /></div>
                <div className="keen-slider__slide number-slide4"> <Image src={slide} alt='Слайд' /></div>
                <div className="keen-slider__slide number-slide5"> <Image src={slide} alt='Слайд' /></div>
                <div className="keen-slider__slide number-slide6"> <Image src={slide} alt='Слайд' /></div>
            </Slider>
        </section>
    );
}

export default Gallery;
