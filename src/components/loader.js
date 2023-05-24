import React from 'react';
import styles from '@/styles/Loader.module.scss';

const Loader = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.loader}></div>
    </div>
  )
}

export default Loader;