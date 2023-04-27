const INITIAL_STATE = {
  drinksRecommendation: [],
  mealsRecommendation: [],
  recommendError: false,
  recommendLoading: true,
};
const recommend = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'REQUEST_DRINKS':
  case 'REQUEST_MEALS':
    return {
      ...state,
      recommendLoading: true,
    };
  case 'RESPONSE_SUCESS_DRINKS':
    return {
      ...state,
      drinksRecommendation: action.data.meals,
      recommendLoading: false,
    };
  case 'RESPONSE_SUCESS_MEALS':
    return {
      ...state,
      mealsRecommendation: action.data.drinks,
      recommendLoading: false,
    };
  case 'RESPONSE_ERROR_DRINKS':
  case 'RESPONSE_ERROR_MEALS':
    return {
      ...state,
      recommendError: action.error,
    };
  default:
    return state;
  }
};

export default recommend;
