import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '@/styles/404.module.scss';
import { inter, openSans } from '../utils/fonts';

const Custom404 = () => {
  return (
    <main className={`${styles.main} ${inter.className}`}>
      <div className={styles.wrapper}>
      <Image
        src='/images/icons/404.svg'
        alt='Not found'
        width={240}
        height={231}
      />
      <h2 className={styles.title}>Упс, здесь еще ничего нет!</h2>
      <Link href='/' legacyBehavior>
        <a className={`${styles.searchVacanciesButton} ${openSans.className}`}>Поиск вакансий</a>
      </Link>
      </div>
    </main>
  );
};

export default Custom404;
