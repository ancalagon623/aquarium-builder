import axios from 'axios';
import qs from 'qs';

export const hydrateUserInfo = (token, navigate) => async (dispatch) => {
  const options = {
    headers: { Authorization: `Bearer ${token}` },
  };

  try {
    const { data, status } = await axios.get(
      `${process.env.REACT_APP_BACKEND}/api/me`,
      options
    );

    if (status === 200) {
      dispatch({ type: 'HYDRATE', payload: data });
    }
  } catch (err) {
    if (err.response.status === 401) {
      dispatch({ type: 'LOGIN_REQUIRED', payload: { navigate } });
    } else {
      return null;
    }
  }
};

export const signup = (userInfo, navigate) => async (dispatch) => {
  const options = {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(userInfo),
    url: `${process.env.REACT_APP_BACKEND}/api/signup`,
  };

  try {
    const { status } = await axios(options);

    if (status === 200) {
      dispatch({ type: 'SIGNUP_SUCCESS' });
      navigate('/login');
    }
  } catch (err) {
    dispatch({ type: 'SIGNUP_ERROR' });
  }
};

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
      localStorage.setItem('currentBuild', data.bld_id);
      navigate(`/builds/edit`);
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

export const getBuild = (buildId, navigate, callback) => async (dispatch) => {
  const token = localStorage.getItem('token');

  const options = {
    headers: { Authorization: `Bearer ${token}` },
  };

  try {
    const { data, status } = await axios.get(
      `${process.env.REACT_APP_BACKEND}/api/me/aquariums/${buildId}`,
      options
    );

    if (status === 200) {
      dispatch({ type: 'BUILD_RECEIVED', payload: data });
      if (callback) {
        callback();
      }
    }
  } catch (err) {
    if (err.response.status === 401) {
      dispatch({ type: 'LOGIN_REQUIRED', payload: navigate });
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

export const addEquipmentToBuild =
  (equipmentId, buildId, navigate) => async (dispatch) => {
    const options = {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    };
    try {
      const { data, status } = await axios.put(
        `${process.env.REACT_APP_BACKEND}/api/me/aquariums/${buildId}`,
        { action: 'add_equipment', eq_id: equipmentId },
        options
      );

      if (status === 200) {
        dispatch({ type: 'EQUIPMENT_UPDATED', payload: data });
        navigate(-1);
      }
    } catch (err) {
      if (err.response.status === 401) {
        return null;
      }
    }
  };

export const updateBuildInfo =
  (buildId, infoObj, callback) => async (dispatch) => {
    const options = {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    };

    try {
      const { data, status } = await axios.put(
        `${process.env.REACT_APP_BACKEND}/api/me/aquariums/${buildId}`,
        { action: 'update_info', info: infoObj },
        options
      );

      if (status === 200) {
        if (parseInt(localStorage.getItem('currentBuild')) === data.bld_id) {
          dispatch({ type: 'BUILD_INFO_UPDATED', payload: data });
        }
        if (callback) callback();
      }
    } catch (err) {
      if (err.response.status === 401) {
        return null;
      }
    }
  };

export const deleteEquipmentFromBuild =
  (equipmentId, buildId) => async (dispatch) => {
    const options = {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    };
    try {
      const { data, status } = await axios.delete(
        `${process.env.REACT_APP_BACKEND}/api/me/aquariums/${buildId}/equipment/${equipmentId}`,
        options
      );

      if (status === 200) {
        dispatch({ type: 'EQUIPMENT_UPDATED', payload: data });
      }
    } catch (err) {
      if (err.response.status === 401) {
        return null;
      }
    }
  };
