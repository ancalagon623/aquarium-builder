const initialState = {
  list: [],
  currentCategory: '',
};

// eslint-disable-next-line default-param-last
const categoriesReducer = (state = initialState, { type, payload }) => {
  if (type === 'CATEGORIES_RECEIVED') {
    return {
      ...state,
      list: payload,
    };
  }
  if (type === 'SET_CURRENT_CATEGORY') {
    return {
      ...state,
      currentCategory: payload,
    };
  }
  return state;
};

export default categoriesReducer;
