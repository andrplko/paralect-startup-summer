import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import axiosHeaders from '@/components/axiosHeaders';
import styles from '@/styles/Dropdown.module.scss';

const Dropdown = (props) => {
  const [dataIndustry, setDataIndustry] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('Выберите отрасль');
  const [selectedItem, setSelectedItem] = useState(null);
  const toggleOpen = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (!props.value) {
      setSelected('Выберите отрасль')
      setSelectedItem(null)
    }

    const updatedValue = dataIndustry.find((industry) => industry.key === parseInt(props.value));
    if (updatedValue) {
      setSelected(updatedValue.title)
      setSelectedItem(updatedValue.key)
    }
  }, [props.value, dataIndustry])

  useEffect(() => {
    axios.get(`https://startup-summer-2023-proxy.onrender.com/2.0/catalogues/`, {
      headers: axiosHeaders,
    }).then((response) => {
      const industries = response.data;
      setDataIndustry(industries);
    }).catch((error) => {
      console.log(error);
    })
  }, []);

  const getDropdownHead = () => {
    let result;
    if (!isOpen && selected === 'Выберите отрасль') {
      result = <div className={styles.dropdownHead}>{selected}</div>;
    } else if(isOpen && selected === 'Выберите отрасль') {
      result = <div className={`${styles.dropdownHead} ${styles.opened}`}>{selected}</div>;
    } else if(!isOpen) {
      result = <div className={`${styles.dropdownHead} ${styles.active}`}>{selected}</div>;
    } else {
      result = <div className={`${styles.dropdownHead} ${styles.opened} ${styles.active}`}>{selected}</div>;
    }
    return result;
  }

  return (
    <div className={styles.dropdown} onClick={toggleOpen} data-elem='industry-select'>
      {getDropdownHead()}
      {isOpen && (
        <div className={styles.dropdownMenu}>
          {dataIndustry
            .sort()
            .map((item) => {
              return (
                <div
                  onClick={() => {
                    setSelected(item.title);
                    setSelectedItem(item.key);
                    props.onChange(item.key);
                  }}
                  className={
                    item.key === selectedItem ? `${styles.dropdownItemSelected}` : `${styles.dropdownItem}`
                  }
                  key={item.key}
                >
                  {item.title}
                </div>
              )
            })
          }
        </div>
      )}
    </div>
  )
}

Dropdown.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Dropdown;
