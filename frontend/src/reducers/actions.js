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

// eslint-disable-next-line camelcase
export const createBuild = (buildInfo, navigate) => async (dispatch) => {
  const token = localStorage.getItem('token');

  const options = {
    headers: { Authorization: `Bearer ${token}` },
  };

  try {
    const { data, status } = await axios.post(
      `${process.env.REACT_APP_BACKEND}/api/me/aquariums`,
      buildInfo,
      options
    );

    if (status === 200) {
      dispatch({ type: 'BUILD_CREATED', payload: { data } });
      navigate('/builds/edit');
    }
  } catch (err) {
    if (err.response.status === 401) {
      dispatch({
        type: 'LOGIN_REQUIRED',
        payload: { error: err.response, navigate },
      });
    }
  }
};

export const getCategories = () => async (dispatch) => {
  const token = localStorage.getItem('token');

  const options = {
    headers: { Authorization: `Bearer ${token}` },
  };

  try {
    const { data, status } = await axios.get(
      `${process.env.REACT_APP_BACKEND}/api/categories`,
      options
    );

    if (status === 200) {
      dispatch({ type: 'CATEGORIES_RECEIVED', payload: data });
    }
  } catch (err) {
    if (err.response.status === 401) {
      return null;
    }
  }
};
