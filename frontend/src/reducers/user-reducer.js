const initialState = {
  loggedIn: false,
  name: '',
  username: '',
  user_id: 0,
  loginError: {},
};

// eslint-disable-next-line
const userReducer = (state = initialState, {type, payload}) => {
  if (type === 'LOGIN_SUCCESS') {
    localStorage.setItem('token', JSON.stringify(payload.auth_token));
    debugger;
    return {
      name: payload.user.name,
      username: payload.user.username,
      user_id: payload.user.user_id,
      loggedIn: true,
      loginError: {},
    };
  }
  if (type === 'LOGIN_FAILURE') {
    return {
      ...state,
      loginError: {
        message: payload.data,
        code: payload.status,
      },
    };
  }
  if (type === 'LOGIN_REQUESTED') {
    return {
      ...state,
      loginError: {},
    };
  }
  if (type === 'LOGOUT') {
    localStorage.removeItem('token');
    return initialState;
  }
  return state;
};

export default userReducer;
