'use client';
import styles from './page.module.css';
import Board from '@/app/components/Board';

export default function EditPage() {
    return (
      <>
        <section className={styles.info}>Click on Text to Change<br/></section>
        <Board isEdit={true}/>  
      </>

    );
}