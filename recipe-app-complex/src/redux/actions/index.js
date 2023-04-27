import fetchDrinksRecomendations from '../../services/DrinksRecommendation';
import fetchMealsRecomendations from '../../services/MealRecommendation';
import fetchDrinkWithId from '../../services/FetchDrink';
import fetchMealWithId from '../../services/FetchMeal';

const ERROR_MESSAGE = 'Sorry, we haven\'t found any recipes for these filters.';

export const requestFetchDrinks = () => ({
  type: 'REQUEST_DRINKS',
});

export const requestFetchMeals = () => ({
  type: 'REQUEST_MEALS',
});

export const responseDrinksSucess = (data) => ({
  type: 'RESPONSE_SUCESS_DRINKS',
  data,
});

export const responseMealsSucess = (data) => ({
  type: 'RESPONSE_SUCESS_MEALS',
  data,
});

export const responseDrinksError = (error) => ({
  type: 'RESPONSE_ERROR_DRINKS',
  error,
});

export const responseMealsError = (error) => ({
  type: 'RESPONSE_ERROR_MEALS',
  error,
});

export function recommendationDrinks() {
  return async (dispatch) => {
    dispatch(requestFetchDrinks());
    try {
      const response = await fetchDrinksRecomendations();
      dispatch(responseDrinksSucess(response));
    } catch (error) {
      dispatch(responseDrinksError(error));
    }
  };
}

export function recommendationMeals() {
  return async (dispatch) => {
    dispatch(requestFetchMeals());
    try {
      const response = await fetchMealsRecomendations();
      dispatch(responseMealsSucess(response));
    } catch (error) {
      dispatch(responseMealsError(error));
    }
  };
}

export const SEARCH_INPUT = 'SEARCH_INPUT';

export const searchInputAction = (payload) => ({
  type: SEARCH_INPUT,
  payload,
});

export const SEND_DATA = 'SEND_DATA';

export const sendDataAction = (payload) => ({
  type: SEND_DATA,
  payload,
});

export const REQUEST_API = 'REQUEST_API';

export const requestApi = () => ({
  type: REQUEST_API,
});

export const fetchApiIngredient = (payload) => async (dispatch) => {
  dispatch(requestApi());
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${payload}`);
  const data = await response.json();
  if (data.meals) {
    dispatch(sendDataAction(data.meals));
  } else {
    dispatch(sendDataAction([]));
    global.alert(ERROR_MESSAGE);
  }
};

export const fetchApiName = (payload) => async (dispatch) => {
  dispatch(requestApi());
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${payload}`);
  const data = await response.json();
  if (data.meals) {
    dispatch(sendDataAction(data.meals));
  } else {
    dispatch(sendDataAction([]));
    global.alert(ERROR_MESSAGE);
  }
};

export const fetchApiLetter = (payload) => async (dispatch) => {
  dispatch(requestApi());
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${payload}`);
  const data = await response.json();
  if (data.meals) {
    dispatch(sendDataAction(data.meals));
  } else {
    dispatch(sendDataAction([]));
    global.alert(ERROR_MESSAGE);
  }
};

export const fetchApiIngredientDrinks = (payload) => async (dispatch) => {
  dispatch(requestApi());
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${payload}`);
  try {
    const data = await response.json();
    dispatch(sendDataAction(data.drinks));
  } catch (error) {
    dispatch(sendDataAction([]));
    console.log(error);
    global.alert(ERROR_MESSAGE);
  }
};

export const fetchApiNameDrinks = (payload) => async (dispatch) => {
  dispatch(requestApi());
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${payload}`);
  const data = await response.json();
  if (data.drinks) {
    dispatch(sendDataAction(data.drinks));
  } else {
    dispatch(sendDataAction([]));
    global.alert(ERROR_MESSAGE);
  }
};

export const fetchApiLetterDrinks = (payload) => async (dispatch) => {
  dispatch(requestApi());
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${payload}`);
  const data = await response.json();
  if (data.drinks) {
    dispatch(sendDataAction(data.drinks));
  } else {
    dispatch(sendDataAction([]));
    global.alert(ERROR_MESSAGE);
  }
};

export const requesMealFetch = () => ({
  type: 'REQUEST_FETCH_MEAL',
});

export const requestDrinkFetch = () => ({
  type: 'REQUEST_FETCH_DRINK',

});

export const responseMealFetchSucess = (data) => ({
  type: 'RESPONSE_FETCH_MEAL_SUCESS',
  data,
});

export const responseDrinkFetchSucess = (data) => ({
  type: 'RESPONSE_FETCH_DRINK_SUCESS',
  data,
});

export const responseMealFetchError = (error) => ({
  type: 'RESPONSE_FETCH_MEAL_ERROR',
  error,
});

export const responseDrinkFetchError = (error) => ({
  type: 'RESPONSE_FETCH_DRINK_ERROR',
  error,
});

export function fetchMealUsingId(pathnameId) {
  return async (dispatch) => {
    dispatch(requesMealFetch());
    try {
      const response = await fetchMealWithId(pathnameId);
      dispatch(responseMealFetchSucess(response));
    } catch (error) {
      dispatch(responseMealFetchError(error));
    }
  };
}
export function fetchDrinkUsingId(pathnameId) {
  return async (dispatch) => {
    dispatch(requestDrinkFetch());
    try {
      const response = await fetchDrinkWithId(pathnameId);
      dispatch(responseDrinkFetchSucess(response));
    } catch (error) {
      dispatch(responseDrinkFetchError(error));
    }
  };
}

export const fetchByCategory = (payload) => async (dispatch) => {
  dispatch(requestApi());
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${payload}`);
  const data = await response.json();
  dispatch(sendDataAction(data.meals));
};

export const fetchByCategoryDrinks = (payload) => async (dispatch) => {
  dispatch(requestApi());
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${payload}`);
  const data = await response.json();
  dispatch(sendDataAction(data.drinks));
};

export const fetchCleanFilter = () => async (dispatch) => {
  dispatch(requestApi());
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const data = await response.json();
  dispatch(sendDataAction(data.meals));
};

export const fetchCleanFilterDrinks = () => async (dispatch) => {
  dispatch(requestApi());
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const data = await response.json();
  dispatch(sendDataAction(data.drinks));
};
