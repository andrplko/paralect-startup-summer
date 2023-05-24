import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '@/styles/Search.module.scss';

const Search = () => {
  const router = useRouter();
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    setKeyword(router.query.keyword || '');
  }, [router.query.keyword]);

  const handleChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const queryParams = new URLSearchParams({
      ...router.query,
      keyword,
    });
    router.push({
      pathname: router.pathname,
      search: queryParams.toString(),
    });
  };

  return (
    <div className={styles.search} data-elem='search-input'>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Введите название вакансии'
          value={keyword}
          onChange={handleChange}
          className={styles.searchInput}
        />
        <button
          type='submit'
          className={styles.searchButton}
          data-elem='search-button'
        >
          Поиск
        </button>
      </form>
    </div>
  );
};

export default Search;
