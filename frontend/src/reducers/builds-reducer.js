const initialState = () => {
  const builds = [];
  // get user's builds from the backend in the future
  return {
    builds,
    currentBuild: {
      user_id: 0,
      editing: false,
      equipment: [],
      name: '',
      description: '',
    },
  };
};

// eslint-disable-next-line default-param-last
const buildReducer = (state = initialState(), { type, payload }) => {
  if (type === 'BUILD_CREATED') {
    return {
      ...state,
      currentBuild: {
        ...state.currentBuild,
        user_id: payload.data.user_id,
        name: payload.data.bld_name,
        description: payload.data.bld_description,
      },
    };
  }
  return state;
};

export default buildReducer;
