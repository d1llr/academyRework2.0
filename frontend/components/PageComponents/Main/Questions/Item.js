import { useEffect, useRef, useState } from 'react';
import styles from './Question.module.scss';
import {memo} from 'react';


const Item =  memo(({ answer, question }) => {
    const [isActive, setIsActive] = useState(false)

    const buttonRef = useRef(null)
    const textRef = useRef(null)
    const blockRef = useRef(null)
    const answerRef = useRef(null)

    useEffect(() => {
        if (isActive) {
            buttonRef.current.style.transform = 'rotate(-45deg)';
            textRef.current.style.color = 'linear-gradient(180deg, #A69249 0%, #5B4B32 100%)'
            blockRef.current.style.borderBottom = '2px solid #A69249'
            answerRef.current.style.transform = 'none';
            // answerRef.current.style.height = '100px'
            answerRef.current.style.transform = `translateY(0)`;
            answerRef.current.style.height = 'fit-content'
            answerRef.current.style.opacity = '1'
        }
        else {
            buttonRef.current.style.transform = 'rotate(0deg)';
            textRef.current.style.color = '#000'
            // answerRef.current.style.height = '0px'
            blockRef.current.style.borderBottom = '1px solid #939393'
            let text =  answerRef.current.offsetHeight.toString();
            answerRef.current.style.transform = `translateY(-${text}px)`;
            answerRef.current.style.height = '0px'
            answerRef.current.style.opacity = '0'
        }
    }, [isActive])

    return (
        <div className={styles.question_answer} ref={blockRef}>
            <div className={styles.question}>
                <span className={isActive ? styles.gradientText : styles.text} ref={textRef}>
                    {question}
                </span>
                <span className={styles.button} ref={buttonRef} onClick={() => setIsActive(prev => !prev)}>
                    +
                </span>
            </div>
            <div className={styles.answer} ref={answerRef}>
                <span>
                    {answer}
                </span>
            </div>

        </div>);
})

export default Item;