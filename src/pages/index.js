import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import ReactPaginate from 'react-paginate';
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
  const [dataVacancies, setDataVacancies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [total, setTotal] = useState(0);
  const vacanciesPerPage = 4;
  const pageCount = Math.ceil(total / vacanciesPerPage);

  const [favourites, setFavourites] = useState(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storage = JSON.parse(localStorage.getItem('favourites'));
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
    localStorage.setItem('favourites', JSON.stringify(favourites));
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
    applyFilters()
  }, [router.query, currentPage])

  if (dataVacancies.length === 0 && !isLoading) {
    return <Custom404 />;
  }

  return (
    <>
      <Head>
        <title>Job Search App</title>
        <meta property='og:title' content='Job Search App' key='title' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='./images/icons/favicon.svg' />
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
                        data-elem={`vacancy-${item.id}`}
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
                        />
                      </Link>
                    );
                  })}
                </div>
                <div className={`${styles.pagination} ${roboto.className}`}>
                  <ReactPaginate
                    previousLabel=''
                    breakLabel='...'
                    nextLabel=''
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={1}
                    onPageChange={(e) => { setCurrentPage(e.selected) } }
                    forcePage={currentPage >= 0 && currentPage < pageCount ? currentPage : 0}
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
      {/* {dataVacancies === null && !isLoading && <Custom404 />} */}
    </>
  )
}

export default Home;
