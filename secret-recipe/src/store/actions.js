import { axiosWithAuth } from '../utils/axiosWithAuth';

export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const REGISTER_START = 'REGISTER_START';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

export const ADDRECIPE_START = 'ADDRECIPE_START';
export const ADDRECIPE_SUCCESS = 'ADDRECIPE_SUCCESS';
export const ADDRECIPE_FAILURE = 'ADDRECIPE_FAILURE';

export const UPDATERECIPE_START = 'UPDATERECIPE_START';
export const UPDATERECIPE_SUCCESS = 'UPDATERECIPE_SUCCESS';
export const UPDATERECIPE_FAILURE = 'UPDATERECIPE_FAILURE';

export const Login = (credentials) => (dispatch) => {
  dispatch({ type: LOGIN_START });

  axiosWithAuth()
    .post('/api/auth/login', credentials)
    .then((res) => {
      console.log(res);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userId', res.data.id);
      dispatch({ type: LOGIN_SUCCESS, payload: res.data.id });
    })
    .catch((err) => {
      console.log(err);
      localStorage.removeItem('token');
      dispatch({ type: LOGIN_FAILURE, payload: err.data });
    });
};

export const Register = (credentials) => (dispatch) => {
  dispatch({ type: REGISTER_START });

  axiosWithAuth()
    .post('/api/auth/register', credentials)
    .then((res) => {
      console.log(res);
      dispatch({ type: REGISTER_SUCCESS });
      Login(credentials);
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: REGISTER_FAILURE, payload: err.data });
    });
};

export const AddRecipe = (credentials) => (dispatch) => {
  dispatch({
    type: ADDRECIPE_START,
    payload: credentials,
  });
  console.log('Adding New Recipe', credentials);
  axiosWithAuth()
    .post('/api/auth/recipes', credentials)
    .then((res) => {
      console.log('Adding Recipe', res);
      dispatch({
        type: ADDRECIPE_SUCCESS,
        payload: res.data.created_recipe,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: ADDRECIPE_FAILURE,
        payload: 'error adding',
      });
    });
};

export const UpdateRecipe = (credentials) => (dispatch) => {
    dispatch({
      type: UPDATERECIPE_START,
      payload: credentials,
    });
    console.log('Updating data', credentials);
    axiosWithAuth()
      .post('/api/auth/recipes', credentials)
      .then((res) => {
        console.log('Updating Recipe', res);
        dispatch({
          type: UPDATERECIPE_SUCCESS,
          payload: res.data.updated_recipe,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: UPDATERECIPE_FAILURE,
          payload: 'error updating',
        });
      });
  };
