'use client';
import styles from './page.module.css';
import Board from '@/app/components/Board';
import Footer from '@/app/components/nav/Footer';

export default function EditPage() {
    return (
      <>
        <Board isEdit={true}/>  
        <Footer />
      </>

    );
}