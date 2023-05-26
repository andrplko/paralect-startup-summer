import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Dropdown from '@/components/dropdown';
import styles from '@/styles/Filters.module.scss';

const Filters = () => {
  const router = useRouter();
  const [filterOptions, setFilterOptions] = useState({
    key: router.query.key || '',
    paymentFrom: router.query.paymentFrom || '',
    paymentTo: router.query.paymentTo || '',
  });

  useEffect(() => {
    setFilterOptions({
      key: router.query.key || '',
      paymentFrom: router.query.paymentFrom || '',
      paymentTo: router.query.paymentTo || '',
    });
  }, [router.query]);

  const handleFilterChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    setFilterOptions((prevOptions) => ({
      ...prevOptions,
      [name]: value || '',
    }));
  };

  const handleIncreasePaymentFrom = (increment) => {
    const currentValue = parseInt(filterOptions.paymentFrom) || 0;
    const updatedValue = increment ? currentValue + 100 : currentValue - 100;
    setFilterOptions((prevOptions) => ({
      ...prevOptions,
      paymentFrom: updatedValue.toString(),
    }));
  };

  const handleIncreasePaymentTo = (increment) => {
    const currentValue = parseInt(filterOptions.paymentTo) || 0;
    const updatedValue = increment ? currentValue + 100 : currentValue - 100;
    setFilterOptions((prevOptions) => ({
      ...prevOptions,
      paymentTo: updatedValue.toString(),
    }));
  };

  const handleIndustryChange = (value) => {
    setFilterOptions((prevOptions) => ({
      ...prevOptions,
      key: value || '',
    }))
  };

  const handleApplyFilters = () => {
    const queryParams = new URLSearchParams({
      ...router.query,
      ...filterOptions,
    });
    router.push({
      pathname: router.pathname,
      search: queryParams.toString(),
    });
  };

  const resetFilters = () => {
    const queryParams = new URLSearchParams({
      ...router.query,
      key: '',
      paymentFrom: '',
      paymentTo: '',
    });
    router.push({
      pathname: router.pathname,
      search: queryParams.toString(),
    });
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.filters}>
        <h3 className={styles.filtersTitle}>Фильтры</h3>
        <button
          type='button'
          onClick={resetFilters}
          className={styles.resetButton}
        >
          Сбросить все
        </button>
      </div>
      <div className={styles.industry}>
        <h4 className={styles.industryTitle}>Отрасль</h4>
        <Dropdown value={filterOptions.key} onChange={handleIndustryChange} />
      </div>
      <div className={styles.salary}>
        <h4 className={styles.salaryTitle}>Оклад</h4>
        <div className={styles.inputsWrapper}>
          <div className={styles.quantity}>
            <input
              type='number'
              name='paymentFrom'
              placeholder='От'
              onChange={(e) => handleFilterChange(e)}
              className={styles.inputFrom}
              value={filterOptions.paymentFrom}
              min='0'
              data-elem='salary-from-input'
            />
            <div className={styles.buttonsWrapper}>
              <button
                className={styles.quantityUp}
                onClick={() => {
                  handleIncreasePaymentFrom(true);
                }}
              />
              <button
                className={styles.quantityDown}
                onClick={() => {
                  handleIncreasePaymentFrom(false);
                }}
              />
            </div>
          </div>
          <div className={styles.quantity}>
            <input
              type='number'
              name='paymentTo'
              placeholder='До'
              onChange={(e) => handleFilterChange(e)}
              className={styles.inputTo}
              value={filterOptions.paymentTo}
              min='0'
              data-elem='salary-to-input'
            />
            <div className={styles.buttonsWrapper}>
              <button
                  className={styles.quantityUp}
                  onClick={() => {
                    handleIncreasePaymentTo(true);
                  }}
                />
                <button
                  className={styles.quantityDown}
                  onClick={() => {
                    handleIncreasePaymentTo(false);
                  }}
                />
            </div>
          </div>
        </div>
        <button
          className={styles.applyButton}
          onClick={handleApplyFilters}
          data-elem='search-button'
        >
          Применить
        </button>
      </div>
    </div>
  );
};

export default Filters;
