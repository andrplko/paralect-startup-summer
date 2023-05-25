import React, { useState, useEffect } from 'react';
import Vacancy from '@/components/vacancy';
import Custom404 from '@/components/404';
import styles from '@/styles/Favourites.module.scss';

const Favourites = () => {

  const [favourites, setFavourites] = useState(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const getVacancies = JSON.parse(localStorage.getItem('favourites'));
      if (getVacancies === null || getVacancies === undefined){
        return [];
      }
      if (getVacancies) {
        return getVacancies;
      } else {
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favourites));
  }, [favourites]);

  if (!favourites || favourites.length === 0) {
    return <Custom404 />;
  }

  return (
    <main className={styles.main}>
      <div className={styles.wrapper}>
        {favourites && (
          <>
            {favourites.map((item) => {
              return (
                <>
                  <Vacancy
                    favourites={favourites}
                    setFavourites={setFavourites}
                    id={item.id}
                    data={item}
                    profession={item.profession}
                    location={item.town.title}
                    workSchedule={item.type_of_work.title}
                    paymentFrom={item.payment_from}
                    paymentTo={item.payment_to}
                    currency={item.currency}
                  />
                </>
              )
            })}
          </>
        )
      }
      </div>
    </main>
  );
};

export default Favourites;
