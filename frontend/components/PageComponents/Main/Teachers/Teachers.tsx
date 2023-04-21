import { FC } from 'react';
import H1 from '../../../UniversalComponents/H1/H1';
import TeacherSlider from '../../../UniversalComponents/TeacherSlider/TeacherSlider';
import Teacher from './Teacher/Teacher';
import styles from './Teachers.module.scss';
import { SwiperSlide } from "swiper/react";
import { useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../../../redux/store';




const Teachers = () => {

    // const teachers: Array<ITeacher> = [
    //     {
    //         id: 1,
    //         'name': 'Денис Моисеев',
    //         'ImageURL': '/Teachers/denis.png',
    //         'description': 'Педагог по актерскому мастерству, степу, клоунаде'
    //     },
    //     {
    //         id: 2,
    //         'name': 'Срджан Симич',
    //         'ImageURL': '/Teachers/srdjan.png',
    //         'description': 'Педагог по актерскому мастерству, сценической речи, пантомимике'
    //     },
    //     {
    //         id: 3,
    //         'name': 'Иван Кирюхин',
    //         'ImageURL': '/Teachers/ivan.png',
    //         'description': 'Педагог по актерскому мастерству, ведущему, сценической речи'
    //     },
    //     {
    //         id: 4,
    //         'name': 'Елена Войницкая',
    //         'ImageURL': '/Teachers/elena.png',
    //         'description': 'Педагог по актерскому мастерству, сценической речи, стендапу'
    //     },
    // ]

    const teachers = useAppSelector((state) => state.teacher)
    const dispatch = useAppDispatch()
    

    return (
        <section className={styles.teachers_container} id='teachers'>
            <H1 text={'Наши преподаватели'} />
            <h1 className={styles.mobileL}>Преподаватели</h1>
            <TeacherSlider>
                {teachers.map((item) => {
                    return <SwiperSlide key={item.id}>
                        <Teacher
                            name={item.name}
                            ImageURL={item.ImageURL}
                            description={item.description} 
                            id={item.id}
                        />
                    </SwiperSlide>
                })}
            </TeacherSlider>
        </section>
    );
}

export default Teachers;