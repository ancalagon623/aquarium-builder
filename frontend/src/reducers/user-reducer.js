const initialState = {
  loggedIn: false,
  name: '',
  user_id: 0,
};

// eslint-disable-next-line
const userReducer = (state = initialState, {type, payload}) => {
  if (type === 'LOG_IN') {
    return { name: payload.name, user_id: payload.user_id, loggedIn: true };
  }
  return state;
};

export default userReducer;
