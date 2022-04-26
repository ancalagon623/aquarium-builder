const initialState = () => {
  const builds = [];
  // get user's builds from the backend in the future
  return {
    builds,
    currentBuild: {
      equipment: [],
      buildInfo: {},
    },
  };
};

// eslint-disable-next-line default-param-last
const buildReducer = (state = initialState(), { type, payload }) => {
  if (type === 'BUILD_CREATED') {
    return { ...state, currentBuild: payload };
  }
  return state;
};

export default buildReducer;
