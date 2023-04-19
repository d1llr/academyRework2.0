import Image from 'next/image';
import styles from './Teacher.module.scss';
import Link from 'next/link';
import { ITeacher } from '../../../../../redux/slices/teacherSlice';
import { useRouter } from 'next/router';




const Teacher = ({ name, ImageURL, description, id }) => {
    const router = useRouter()
    return (
        <div id={styles.teacher_wrapper} onClick = {()=>{ router.push(`/teachers/${id}`)}}>
            <Image src={ImageURL+'.png'} width={200} height={200} alt='name'/>
            <div className={styles.text_wrapper}>
                <h2>
                    {name}
                </h2>
                <h3>
                    {description}
                </h3>
            </div>

        </div>
    );
}

export default Teacher;