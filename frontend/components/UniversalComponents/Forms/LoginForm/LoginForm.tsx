import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import styles from './styles.module.scss'
import InputMask from 'react-input-mask'


type FormValuesEmail = {
    email: string;
    password: string;
};

type FormValuesPhone = {
    phone: string;
    password: string;
};

interface IData {
    type: string,
    value: string,
}


const handleChange = (e) => {

}



export default function LoginForm() {
    const [phase, setPhase] = useState('phone')
    const { register, handleSubmit } = useForm<FormValuesEmail | FormValuesPhone>();
    const onSubmit: SubmitHandler<FormValuesEmail | FormValuesPhone> = data => console.log(data);

    return (
        <>
            <ul className={styles.variants_picker}>
                <li onClick={() => setPhase(prev => prev = 'phone')} className={phase === 'phone' ? styles.li_active : styles.li}>
                    По номеру телефона
                </li>
                <li onClick={() => setPhase('email')} className={phase === 'email' ? styles.li_active : styles.li}>
                    По почте
                </li>
            </ul>
            {phase === 'email' ?
                <div className={styles.form_container}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input
                            {...register("email")}
                            onChange={e => handleChange(e.target.value)}
                            placeholder='EMAIL'
                        />
                        <input {...register("password")} />

                        <input type="submit" />
                    </form>
                </div>
                :
                <div className={styles.form_container}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <InputMask
                            mask="+7(999) 999-99-99"
                            maskChar="_"
                            placeholder = 'Номер'
                            {...register("phone")} />
                        <input {...register("password")} placeholder='Пароль' />
                        <input type="submit" value='Войти' className={styles.submit} />
                        <div className={styles.register}>
                            <span className={styles.text}>
                                Еще нет аккаунта?
                            </span>
                            <span className={styles.register_action}>
                                Зарегистрируйтесь!
                            </span>
                        </div>
                    </form>
                </div>}
        </>);

}