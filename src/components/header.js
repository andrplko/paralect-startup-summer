import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { poppins, inter } from '../utils/fonts';
import styles from '@/styles/Header.module.scss';

const Header = () => {
  const router = useRouter();
  const isVacancyPage = router.pathname === '/';
  const isFavouritesPage = router.pathname === '/favourites';

  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <div className={styles.logo}>
          <Image
            src="/images/icons/logo-icon.svg"
            alt="logo icon"
            width={30}
            height={30}
          />
          <h1 className={`${styles.logoTitle} ${poppins.className}`}>Jobored</h1>
        </div>
        <nav className={`${styles.nav} ${inter.className}`}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <Link href="/" legacyBehavior>
                <a className={isVacancyPage ? (`${styles.navLink} ${styles.active}`) : (`${styles.navLink}`)}>Поиск вакансий</a>
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/favourites" legacyBehavior>
                <a className={isFavouritesPage ? (`${styles.navLink} ${styles.active}`) : (`${styles.navLink}`)}>Избранное</a>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header;