import React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ReactPaginate from 'react-paginate';
import Head from 'next/head';
import Link from 'next/link';
import axios from 'axios';
import axiosHeaders from '@/components/axiosHeaders';
import Loader from '@/components/loader';
import Filters from '@/components/filters';
import Search from '@/components/search';
import Vacancy from '@/components/vacancy';
import Custom404 from '@/components/404';
import { inter, roboto } from '../utils/fonts';
import styles from '@/styles/Home.module.scss';

function Home() {
  const router = useRouter();
  const [dataVacancies, setDataVacancies] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [total, setTotal] = useState(0);
  const vacanciesPerPage = 4;
  const pageCount = Math.ceil(total / vacanciesPerPage);

  const [favourites, setFavourites] = useState(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const storage = JSON.parse(localStorage.getItem("favourites"));
      if (storage === null || storage === undefined) {
        return [];
      }
      if (storage) {
        return storage;
      } else {
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  const applyFilters = () => {
    setIsLoading(true);
    const {keyword = '', key = '', paymentFrom = '', paymentTo = ''} = router.query;
    axios.get(`https://startup-summer-2023-proxy.onrender.com/2.0/vacancies/`, {
      headers: axiosHeaders,
      params: {
        page: currentPage,
        count: vacanciesPerPage,
        published: 1,
        no_agreement: 1,
        keyword: keyword || undefined,
        catalogues: key || undefined,
        payment_from: paymentFrom || undefined,
        payment_to: paymentTo || undefined,
      }
    }).then((response) => {
        setIsLoading(false);
        const dataVacancies = response.data;
        setTotal(Math.min(dataVacancies.total, 500));
        setDataVacancies(dataVacancies.objects);
      }).catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        "x-secret-key": 'GEU4nvd3rej*jeh.eqp',
        "x-api-app-id": 'v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948',
        "Content-Type": 'application/json',
        "Authorization": "Bearer v3.r.137440105.7b73be738fee43b9b5d64add55b523ca88677da0.c809c2e7c8566dea2f5032bd2ac4f3419ee50f0c"
      },
    }
    fetch(`https://startup-summer-2023-proxy.onrender.com/2.0/oauth2/refresh_token/?refresh_token=v3.r.137440105.9806b9163059952f30d3aaae5da79cd174bca257.f82776db2df63097098b44c9354b707e6f803606&client_id=2356&client_secret=v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948`, options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }, []);

  useEffect(() => {
    applyFilters()
  }, [router.query, currentPage])

  if (dataVacancies === null && !isLoading) {
    return <Custom404 />;
  }

  return (
    <>
      <Head>
        <title>Job Search App</title>
        <meta property="og:title" content="Job Search App" key="title" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="./images/icons/favicon.svg" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <div className={styles.wrapper}>
          <Filters />
          <div className={styles.content}>
            <Search />
            {!isLoading ? (
              <>
                <div className={styles.vacanciesWrapper}>
                  {dataVacancies.map((item) => {
                    return (
                      <Link
                        href={{
                          pathname: `/vacancy/[id]`,
                          query: {
                            id: item.id
                          }
                        }}
                        key={item.id}
                      >
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
                          data-elem={`vacancy-${item.id}`}
                        />
                      </Link>
                    );
                  })}
                </div>
                <div className={`${styles.pagination} ${roboto.className}`}>
                  <ReactPaginate
                    previousLabel=""
                    breakLabel="..."
                    nextLabel=""
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={1}
                    onPageChange={(e) => { setCurrentPage(e.selected) } }
                    forcePage={currentPage}
                    pageCount={pageCount}
                    containerClassName={styles.paginationList}
                    pageClassName={styles.paginationItem}
                    pageLinkClassName={styles.paginationLink}
                    previousClassName={styles.paginationItemPrev}
                    previousLinkClassName={styles.paginationLinkPrev}
                    nextClassName={styles.paginationItemNext}
                    nextLinkClassName={styles.paginationLinkNext}
                    breakClassName={styles.paginationItem}
                    breakLinkClassName={styles.paginationLink}
                    activeClassName={styles.active}
                    disabledClassName={styles.disabled}
                    renderOnZeroPageCount={null}
                  />
                </div>
              </>
            ) : (
              <Loader />
            )}
          </div>
        </div>
      </main>
    </>
  )
}

export default Home;