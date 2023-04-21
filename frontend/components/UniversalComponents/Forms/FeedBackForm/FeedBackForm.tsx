import React, { useState } from 'react';
import { useForm, Resolver } from 'react-hook-form';
import styles from './styles.module.scss'
import { useSendEmailMutation } from '../../../../redux/api/mailApi';

import InputMask from 'react-input-mask'
import Spinner from '../../spinner/Spinner';

type FormValues = {
  first_name: string;
  phone: string;
  description: string;
};


const resolver: Resolver<FormValues> = async (values) => {
  return {
    values: values.first_name ? values : {},
    errors: !values.first_name
      ? {
        first_name: {
          type: 'required',
          message: 'Обязательное поле',
        },
        phone: {
          type: 'required',
          message: 'Обязательное поле',
        },
      }
      : {},
  };
};

const phoneForBackend = async (phone: string) => {
  ['(', ')', '-', '-'].map(item => {
    phone = phone.replace(item, '')
  })
  console.log(phone);

  return phone
}

export default function App() {

  const [value, setValue] = useState('')
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({ resolver });
  const [sendEmail, { isLoading, isSuccess, isError, status }] = useSendEmailMutation()
  const onSubmit = handleSubmit(async (data: FormValues) => {
    data.phone = await phoneForBackend(data.phone)
    await sendEmail({
      id: 1,
      data: data
    })
  }
  );



  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <span>
        и мы свяжемся с вами в ближайшее время
      </span>
      <input {...register("first_name")} placeholder="Имя" />
      {errors?.first_name && <p>{errors.first_name.message}</p>}
      <InputMask
        mask="+7(999)999-99-99"
        maskChar="_"
        alwaysShowMask
        {...register("phone")}
      // beforeMaskedValueChange={beforeMaskedValueChange}
      />
      {errors?.phone && <p>{errors.phone.message}</p>}
      <textarea {...register("description")} placeholder="Комментарий" />
      {
        isLoading &&
        <div className={styles.loading}>
          <Spinner />
        </div>
      }
      {isSuccess &&
        <div className={styles.success}>
          Успешно
        </div>
      }
      {isError &&
        <div className={styles.error}>
          Ошибка
        </div>
      }
      {status === 'uninitialized' && <input type="submit" value={'Отправить'} className={styles.submit} />}

    </form>
  );
}