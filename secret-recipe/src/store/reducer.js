import {
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    REGISTER_START,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    ADDRECIPE_START,
    ADDRECIPE_SUCCESS,
    ADDRECIPE_FAILURE,
    UPDATERECIPE_START,
    UPDATERECIPE_SUCCESS,
    UPDATERECIPE_FAILURE,
  } from './actions';
  
  const initialState = {
    user: {
      id: 0,
    },
    recipes: [],
    isFetching: false,
    error: '',
    isEditing: false,
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case LOGIN_START:
        return {
          ...state,
          isFetching: true,
          error: '',
        };
      case LOGIN_SUCCESS:
        return {
          ...state,
          isFetching: false,
          user: { id: action.payload },
        };
      case LOGIN_FAILURE:
        return {
          ...state,
          isFetching: false,
          error: action.payload,
        };
      case REGISTER_START:
        return {
          ...state,
          isFetching: true,
          error: '',
        };
      case REGISTER_SUCCESS:
        return {
          ...state,
          isFetching: false,
        };
      case REGISTER_FAILURE:
        return {
          ...state,
          isFetching: false,
          error: action.payload,
        };
      case ADDRECIPE_START:
        return {
          ...state,
          isFetching: true,
          error: '',
        };
      case ADDRECIPE_SUCCESS:
        console.log('action payload', action.payload);
        return {
          ...state,
          recipes: [...state.recipes, action.payload],
          isFetching: false,
        };
      case ADDRECIPE_FAILURE:
        return {
          ...state,
          isFetching: false,
          error: action.payload,
        };
      case UPDATERECIPE_START:
            return {
              ...state,
              isFetching: true,
              error: '',
            };
      case UPDATERECIPE_SUCCESS:
            console.log('action payload', action.payload);
            return {
              ...state,
              recipes: [...state.recipes, action.payload],
              isFetching: false,
            };
      case UPDATERECIPE_FAILURE:
            return {
              ...state,
              isFetching: false,
              error: action.payload,
            };
      default:
        return state;
    }
  };
  
  export default reducer;
  