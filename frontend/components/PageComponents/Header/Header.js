import Link from "next/link";
import Image from "next/image";
import { styles, aboutpng, disc, teachers, answers, callback, logotype, login } from './imports'
import { useEffect, useState } from "react";
import { Button, Modal } from 'antd';

import { useGetUserQuery } from '../../../redux/api/userApi'
const Header = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    // useEffect(()=>{
    //   switch (switcher) {
    //     case true:
    //        showModal()
    //       break;

    //     case false:
    //       handleCancel()
    //       break;
    //   }

    // },[switcher])
    const showModal = () => {
        setIsModalOpen(true);
    };


    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const { data, error, isLoading } = useGetUserQuery()
    console.log(data);
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
                            <Link href="#about">
                                <Image src={aboutpng} alt="О нас" />
                                <span>О нас</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="#disciplines">
                                <Image src={disc} alt="Дисциплины" />
                                <span> Дисциплины</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="#teachers">
                                <Image src={teachers} alt="Преподователи" />
                                <span>Преподаватели</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="#contacts">
                                <Image src={answers} alt="Ответы на вопросы" />
                                <span>Ответы на вопросы</span>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className={styles.feed_back}>
                    <Link href='/callback'>
                        <button className={styles.text}>
                            Обратный звонок
                        </button>
                        <button className={styles.phone}>
                            <Image src={callback} alt="Обратный звонок" />
                        </button>
                    </Link>
                    <Link href='#login'>
                        <div className={styles.login_wrapper} onClick={() => showModal()}>
                            <Image src={login} className={styles.login} alt="Логин" />
                        </div>
                    </Link>
                    <>
                        <Modal
                            title="В разработке/ in development"
                            open={isModalOpen}
                            onOk={handleOk}
                            onCancel={handleCancel}
                            footer={null}
                            con={styles.modal_container}
                        >
                            {/* <form>
                                <input type="email" name='login' placeholder="Почта или телефон" />
                                <input type="password" name='password' placeholder="Пароль" />

                            </form>
                            <button onClick={() => handleSubmit()}>
                                Get Users
                            </button> */}
                        </Modal>
                    </>
                </div>
            </nav>
        </header >
    );
}

export default Header;