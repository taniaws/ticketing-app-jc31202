'use client';
import Image from 'next/image';
import styles from './page.module.css';
import { withAuth } from '@/hoc/authGuard';
function Home() {
  return (
    <div className="flex flex-col justify-center items-center w-full min-h-[80vh] bg-">
      <Image width="500" height="500" src="/meteor.png" alt=""></Image>
      <h1 className="text-center font-bold text-8xl ">BAD EVENT SURABAYA</h1>
      <div></div>
    </div>
  );
}

export default withAuth(Home);
