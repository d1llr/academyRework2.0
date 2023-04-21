import Link from "next/link";
import Image from "next/image";
import { styles, aboutpng, disc, teachers, answers, callback, logotype, login } from './imports'
import { useEffect, useState } from "react";
import { Button, Modal } from 'antd';
import { useAppDispatch } from '../../../redux/store'

import { openModal } from "../../../redux/slices/modalSlice";
import LoginForm from "../../UniversalComponents/Forms/LoginForm/LoginForm";
const Header = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const dispatch = useAppDispatch()

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        // first prevent the default behavior
        e.preventDefault();
        // get the href and remove everything before the hash (#)
        const href = e.currentTarget.href;
        const targetId = href.replace(/.*\#/, "");
        // get the element by id and use scrollIntoView
        const elem = document.getElementById(targetId);
        elem?.scrollIntoView({
            behavior: "smooth",
        });
    };

    const showModal = () => {
        setIsModalOpen(true);
    };


    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <header className={styles.page_header}>
            <nav>
                <div className={styles.header_wrapper}>
                    <Link href='/'>
                        <div className={styles.logotype}>
                            <Image src={logotype} placeholder='blur' width={176} height={76} alt="Логотип" />
                        </div>
                    </Link>
                    <ul className="menu">
                        <li>
                            <Link href="#about" onClick={handleScroll}>
                                <Image src={aboutpng} alt="О нас" />
                                <span>О нас</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="#disciplines" onClick={handleScroll}>
                                <Image src={disc} alt="Дисциплины" />
                                <span> Дисциплины</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="#teachers" onClick={handleScroll}>
                                <Image src={teachers} alt="Преподователи" />
                                <span>Преподаватели</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="#questions" onClick={handleScroll}>
                                <Image src={answers} alt="Ответы на вопросы" />
                                <span>Ответы на вопросы</span>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className={styles.feed_back}>
                    <div onClick={() => dispatch(openModal(true))}>
                        <button className={styles.text}>
                            Обратный звонок
                        </button>
                        <button className={styles.phone} >
                            <Image src={callback} alt="Обратный звонок" />
                        </button>
                    </div>
                    <Link href='#login'>
                        <div className={styles.login_wrapper} onClick={() => showModal()}>
                            <Image src={login} className={styles.login} alt="Логин" />
                        </div>
                    </Link>
                    <>
                        <Modal
                            title="Вход в личный кабинет"
                            open={isModalOpen}
                            onOk={handleOk}
                            onCancel={handleCancel}
                            footer={null}

                        >
                            <LoginForm/>

                        </Modal>
                    </>
                </div>
            </nav>
        </header >
    );
}

export default Header;