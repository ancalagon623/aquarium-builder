import axios from 'axios';
import qs from 'qs';

export const login = (loginObj) => async (dispatch) => {
  const options = {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(loginObj),
    url: `${process.env.REACT_APP_BACKEND}/api/login`,
  };

  try {
    const { data, status } = await axios(options);

    if (status === 200) {
      dispatch({ type: 'LOGIN_SUCCESS', payload: data });
    }
  } catch (err) {
    if (err.response.status === 401) {
      dispatch({ type: 'LOGIN_FAILURE', payload: err.response });
    }
  }
};
