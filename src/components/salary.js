import React from 'react';
import PropTypes from 'prop-types';
import styles from '@/styles/Vacancy.module.scss';

function Salary({ paymentFrom, paymentTo, currency }) {
  let result;
  if (paymentFrom > 0) {
    result = `з/п от ${paymentFrom} ${currency}`;
  }
  if (paymentTo > 0) {
    result = `з/п до ${paymentTo} ${currency}`;
  }
  if (paymentFrom > 0 && paymentTo > 0) {
    result = `з/п ${paymentFrom}-${paymentTo} ${currency}`;
  }
  return <span className={styles.salaryValue}>{result}</span>;
}

Salary.propTypes = {
  paymentFrom: PropTypes.number,
  paymentTo: PropTypes.number,
  currency: PropTypes.string,
};

export default Salary;