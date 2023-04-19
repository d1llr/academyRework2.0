import styles from './H1.module.scss';

interface props{
    tag?:string,
    text:string
}


const H1 = ({tag,text}:props) => {
    tag ? tag : 'h1'
    return ( 
        <h1 className = {styles.h1}>{text}</h1>
     );
}
 
export default H1;