import * as authActions from "../actions/actions";
import initialState from "./initialStates.json";

const authReducer = (state = initialState.auth, action) => {
  switch (action.type) {
    case authActions.SIGN_UP_REQUEST:
      return { ...state, loading: true };
    case authActions.SIGN_UP_SUCCESS:
      return { ...state, loading: false };
    case authActions.SIGN_UP_FAILED:
      return { ...state, loading: false, error: action.payload };
    case authActions.SIGN_IN_REQUEST:
      return { ...state, loading: true };
    case authActions.SIGN_IN_SUCCESS:
      return { ...state, loading: false };
    case authActions.SIGN_IN_FAILED:
      return { ...state, loading: false, error: action.payload };
    case authActions.REMOVE_ERROR:
      return { ...state, error: "" };
    case authActions.SIGN_OUT_REQUEST:
      return { ...state, loading: true };
    case authActions.SIGN_OUT_SUCCESS:
      return { ...state, loading: false };
    case authActions.SIGN_OUT_FAILED:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default authReducer;
