'use client';
import Board from '@/app/components/Board';
import Footer from '@/app/components/nav/Footer';

export default function Home() {

  return (
    <>
      <Board isEdit={false}/>  
      <Footer />
    </>
  )
}
