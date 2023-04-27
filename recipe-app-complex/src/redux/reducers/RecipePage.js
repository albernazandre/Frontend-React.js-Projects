const INITIAL_STATE = {
  detailsObject: {},
  detailsError: false,
  detailsLoading: true,
};
const RecipePage = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'REQUEST_FETCH_MEAL':
  case 'REQUEST_FETCH_DRINK':
    return {
      ...state,
      detailsLoading: true,
    };
  case 'RESPONSE_FETCH_MEAL_SUCESS':
    return {
      ...state,
      detailsObject: action.data.meals,
      detailsLoading: false,
    };
  case 'RESPONSE_FETCH_DRINK_SUCESS':
    return {
      ...state,
      detailsObject: action.data.drinks,
      detailsLoading: false,
    };
  case 'RESPONSE_FETCH_MEAL_ERROR':
  case 'RESPONSE_FETCH_DRINK_ERROR':
    return {
      ...state,
      detailsError: action.error,
    };
  default:
    return state;
  }
};

export default RecipePage;
