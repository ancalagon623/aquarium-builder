const initialState = {
  builds: [],
  currentBuild: {
    user_id: 0,
    bld_id: 0,
    price: 0,
    equipment: {
      all: [],
      normalized: {},
    },
    name: '',
    description: '',
  },
};

// eslint-disable-next-line default-param-last
const buildReducer = (state = initialState, { type, payload }) => {
  if (type === 'BUILD_CREATED') {
    return {
      ...state,
      currentBuild: {
        equipment: initialState.currentBuild.equipment,
        user_id: payload.data.user_id,
        bld_id: payload.data.bld_id,
        name: payload.data.bld_name,
        description: payload.data.bld_description,
      },
    };
  }
  if (type === 'EQUIPMENT_UPDATED') {
    return {
      ...state,
      currentBuild: {
        ...state.currentBuild,
        price: payload.price,
        equipment: payload.equipment,
      },
    };
  }
  if (type === 'BUILD_RECEIVED') {
    return {
      ...state,
      currentBuild: {
        price: payload.price,
        equipment: payload.equipment,
        user_id: payload.user_id,
        bld_id: payload.bld_id,
        name: payload.bld_name,
        description: payload.bld_description,
      },
    };
  }
  if (type === 'BUILD_INFO_UPDATED') {
    return {
      ...state,
      currentBuild: {
        ...state.currentBuild,
        bld_id: payload.bld_id,
        name: payload.bld_name,
        description: payload.bld_description,
      },
    };
  }
  return state;
};

export default buildReducer;
