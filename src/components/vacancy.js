import React from 'react';
import PropTypes from 'prop-types';
import Salary from '@/components/salary';
import FavouriteIcon from '@/components/favourite-icon';
import FavouriteIconEmpty from '@/components/favourite-icon-empty';
import styles from '@/styles/Vacancy.module.scss';

const Vacancy = ({ data, id, profession, location, workSchedule, paymentFrom, paymentTo, currency, favourites, setFavourites }) => {

  const addFav = () => {
    setFavourites([...JSON.parse(localStorage.getItem("favourites")), data]);
  };

  const removeFav = () => {
    setFavourites([...JSON.parse(localStorage.getItem("favourites")).filter((found) => found.id !== data.id)]);
  };

  const isFavourited = Boolean(favourites.find(f => f.id === id));

  const handleToggleFavourite = () => {
    if (!isFavourited) {
      addFav();
    } else {
      removeFav();
    }
  };

  return (
      <div className={`${styles.vacancy}`}>
        <div className={styles.vacancyContent}>
          <p className={`${styles.vacanсyPosition}`}>{profession}</p>
          <div className={styles.salary}>
            <Salary
              paymentFrom={paymentFrom}
              paymentTo={paymentTo}
              currency={currency}
            />
            <span className={styles.workSchedule}>{workSchedule}</span>
          </div>
          <p className={styles.vacancyLocation}>{location}</p>
        </div>
        <div
          className={styles.iconWrapper}
          onClick={(e) => {
            e.preventDefault();
            handleToggleFavourite();
          }}
          data-elem={`vacancy-${id}-shortlist-button`}
        >
          {isFavourited ? (
            <FavouriteIcon />
          ) : (
            <FavouriteIconEmpty className={styles.favouriteIconEmpty} />
          )}
        </div>
      </div>
  );
};

Vacancy.propTypes = {
  data: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired,
  profession: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  workSchedule: PropTypes.string.isRequired,
  paymentFrom: PropTypes.number.isRequired,
  paymentTo: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  favourites: PropTypes.array.isRequired,
  setFavourites: PropTypes.func.isRequired,
};

export default Vacancy;
