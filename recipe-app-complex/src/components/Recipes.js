import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Drinks from '../pages/Drinks';
import Meals from '../pages/Meals';
import {
  fetchByCategory,
  fetchByCategoryDrinks,
  fetchCleanFilter,
  fetchCleanFilterDrinks,
} from '../redux/actions';

export default function Recipes() {
  const location = useLocation();
  const { pathname } = location;

  const [categoryDrinks, setCategoryDrinks] = useState([]);
  const [categoryMeals, setCategoryMaels] = useState([]);
  const [categorySelect, setCategorySelect] = useState(false);

  useEffect(() => {
    const drinksCategories = async () => {
      const number = 5;
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
      const data = await response.json();
      const drinksFive = data.drinks.slice(0, number);
      setCategoryDrinks(drinksFive);
    };
    drinksCategories();
  }, []);

  useEffect(() => {
    const mealsCategories = async () => {
      const number = 5;
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
      const data = await response.json();
      const mealsFive = data.meals.slice(0, number);
      setCategoryMaels(mealsFive);
    };
    mealsCategories();
  }, []);

  const dispatch = useDispatch();

  return (
    <div>
      <div>
        {pathname === '/meals'
          ? (
            <button
              data-testid="All-category-filter"
              onClick={ () => dispatch(fetchCleanFilter()) }
            >
              All
            </button>
          )
          : (
            <button
              data-testid="All-category-filter"
              onClick={ () => dispatch(fetchCleanFilterDrinks()) }
            >
              All
            </button>)}

        {pathname === '/drinks' ? categoryDrinks.map((drink, i) => (
          <button
            key={ i }
            data-testid={ `${drink.strCategory}-category-filter` }
            onClick={ () => {
              if (!categorySelect) {
                dispatch(fetchByCategoryDrinks(drink.strCategory));
                setCategorySelect(true);
              } else {
                dispatch(fetchCleanFilterDrinks());
                setCategorySelect(false);
              }
            } }
          >
            {drink.strCategory}
          </button>)) : categoryMeals.map((meals, i) => (
          (
            <button
              key={ i }
              data-testid={ `${meals.strCategory}-category-filter` }
              onClick={ () => {
                if (!categorySelect) {
                  dispatch(fetchByCategory(meals.strCategory));
                  setCategorySelect(true);
                } else {
                  dispatch(fetchCleanFilter());
                  setCategorySelect(false);
                }
              } }
            >
              {meals.strCategory}
            </button>)
        ))}
      </div>

      {pathname === '/meals' ? <Meals /> : <Drinks />}
    </div>
  );
}
