import { REQUEST_API, SEARCH_INPUT, SEND_DATA } from '../actions';

const INITIAL_STATE = {
  search: '',
  data: [],
  isLoading: false,
};

const search = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SEARCH_INPUT: {
    return {
      ...state,
      search: action.payload,
    };
  }
  case SEND_DATA: {
    return {
      ...state,
      data: action.payload,
      isLoading: false,
    };
  }

  case REQUEST_API: {
    return {
      ...state,
      isLoading: true,
    };
  }
  default:
    return state;
  }
};

export default search;
