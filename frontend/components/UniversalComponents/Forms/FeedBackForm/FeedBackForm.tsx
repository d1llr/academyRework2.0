import React from 'react';
import { useForm, Resolver } from 'react-hook-form';
import styles from './styles.module.scss'
import { useSendEmailMutation } from '../../../../redux/api/mailApi';


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
          message: 'This is required.',
        },
      }
      : {},
  };
};

export default function App() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({ resolver });
  const [sendEmail] = useSendEmailMutation()
  const onSubmit = handleSubmit(async (data: FormValues) => {
    // fetch('/api/contacts', {
    //   method: 'post',
    //   body: JSON.stringify(data)

    // });
    sendEmail({
      id:1,
      data:data
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

      <input {...register("phone")} placeholder="Номер телефона" />

      <textarea {...register("description")} placeholder="Комментарий" />

      <input type="submit" value={'Отправить'} />
    </form>
  );
}