import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import {
  fetchApiIngredient,
  fetchApiIngredientDrinks,
  fetchApiLetter,
  fetchApiLetterDrinks,
  fetchApiName,
  fetchApiNameDrinks } from '../redux/actions';

function SearchBar() {
  const [filter, setFilter] = useState('');
  const location = useLocation();
  const { pathname } = location;
  const dispatch = useDispatch();
  const search = useSelector((state) => state.search.search);
  const isLoading = useSelector((state) => state.search.isLoading);
  const data = useSelector((state) => state.search.data);
  const history = useHistory();

  const handleChange = ({ target }) => {
    setFilter(target.value);
  };

  const handleClickMeals = () => {
    if (filter === 'ingredient') {
      dispatch(fetchApiIngredient(search));
    } else if (filter === 'name-search') {
      dispatch(fetchApiName(search));
    } else if (filter === 'first-letter' && search.length === 1) {
      dispatch(fetchApiLetter(search));
    } else {
      global.alert('Your search must have only 1 (one) character');
    }
  };

  const handleClickDrinks = () => {
    if (filter === 'ingredient') {
      dispatch(fetchApiIngredientDrinks(search));
    } else if (filter === 'name-search') {
      dispatch(fetchApiNameDrinks(search));
    } else if (filter === 'first-letter' && search.length <= 1) {
      dispatch(fetchApiLetterDrinks(search));
    } else {
      global.alert('Your search must have only 1 (one) character');
    }
  };

  if (data && data.length === 1 && pathname === '/meals') {
    history.push(`/meals/${data[0].idMeal}`);
  } else if (data && data.length === 1 && pathname === '/drinks') {
    history.push(`/drinks/${data[0].idDrink}`);
  }

  if (!isLoading) {
    return (
      <div>
        <label htmlFor="input-ingredient">
          <input
            data-testid="ingredient-search-radio"
            type="radio"
            name="filter"
            id="input-ingredient"
            value="ingredient"
            onChange={ handleChange }
          />
          Ingredient
        </label>
        {' '}
        <label htmlFor="input-name-search">
          <input
            data-testid="name-search-radio"
            type="radio"
            name="filter"
            id="input-name-search"
            value="name-search"
            onChange={ handleChange }
          />
          Name
        </label>
        {' '}
        <label htmlFor="input-first-letter">
          <input
            data-testid="first-letter-search-radio"
            type="radio"
            name="filter"
            id="input-first-letter"
            value="first-letter"
            onChange={ handleChange }
          />
          First Letter
        </label>
        {' '}
        <button
          data-testid="exec-search-btn"
          type="button"
          onClick={
            () => (pathname === '/meals' ? handleClickMeals() : handleClickDrinks())
          }
        >
          Search
        </button>
      </div>
    );
  }
}

export default SearchBar;
