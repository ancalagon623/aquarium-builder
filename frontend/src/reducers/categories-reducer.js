const initialState = {
  list: [],
  equipmentByCategory: {},
};

// eslint-disable-next-line default-param-last
const categoriesReducer = (state = initialState, { type, payload }) => {
  if (type === 'CATEGORIES_RECEIVED') {
    return {
      list: payload,
      equipmentByCategory: {},
    };
  }
  return state;
};

export default categoriesReducer;
