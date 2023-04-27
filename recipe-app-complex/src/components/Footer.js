import React from 'react';
import './style/Footer.css';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import { sendDataAction } from '../redux/actions';

export default function Footer() {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleRedirectDrinks = () => {
    dispatch(sendDataAction([]));
    history.push('/drinks');
  };

  const handleRedirectMeals = () => {
    dispatch(sendDataAction([]));
    history.push('/meals');
  };

  return (
    <footer
      data-testid="footer"
    >
      <button
        type="button"
        onClick={ handleRedirectDrinks }
      >
        <img
          data-testid="drinks-bottom-btn"
          alt="Drinks"
          src={ drinkIcon }
        />
      </button>
      <button
        type="button"
        onClick={ handleRedirectMeals }
      >
        <img
          data-testid="meals-bottom-btn"
          alt="Meals"
          src={ mealIcon }
        />
      </button>
    </footer>
  );
}
