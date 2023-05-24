import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Loader from '@/components/loader';
import Vacancy from '@/components/vacancy';
import axios from 'axios';
import axiosHeaders from '@/components/axiosHeaders';
import { inter } from '../../utils/fonts';
import styles from '@/styles/VacancyPage.module.scss';

const VacancyPage = () => {
  const router = useRouter();
  const { id: vacancyId } = router.query;
  const [dataVacancy, setDataVacancy] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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

  useEffect(() => {
    if (vacancyId) {
      setIsLoading(true);
      axios.get(`https://startup-summer-2023-proxy.onrender.com/2.0/vacancies/${vacancyId}/`, {
        headers: axiosHeaders,
      }).then((response) => {
        setIsLoading(false);
        const vacancy = response.data;
        setDataVacancy(vacancy);
      }).catch((error) => {
        console.log(error);
        setIsLoading(false);
      })
    }
  }, [vacancyId]);

  return (
    <>
      <main className={`${styles.main} ${inter.className}`}>
      {!isLoading ? (
        <>
          {dataVacancy && (
            <div className={styles.vacancyWrapper}>
              <Vacancy
                favourites={favourites}
                setFavourites={setFavourites}
                id={dataVacancy.id}
                profession={dataVacancy.profession}
                location={dataVacancy.town.title}
                workSchedule={dataVacancy.type_of_work.title}
                paymentFrom={dataVacancy.payment_from}
                paymentTo={dataVacancy.payment_to}
                currency={dataVacancy.currency}
              />
              <div
                className={styles.description}
                dangerouslySetInnerHTML={{__html: dataVacancy.vacancyRichText}}
              />
            </div>
          )}
        </>
        ) : (
          <Loader />
        )}
      </main>
    </>
  );
}

export default VacancyPage;
