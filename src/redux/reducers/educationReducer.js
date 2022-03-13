import * as educationActions from "../actions/actions";
import initialState from "./initialStates.json";

const educationReducer = (state = initialState.education, action) => {
  switch (action.type) {
    case educationActions.SET_EDUCATION:
      return { ...state, data: { ...action.payload } };
    case educationActions.UPDATE_EDUCATION:
      return { ...state, data: { ...action.payload } };
    case educationActions.FETCH_EDUCATION_REQ:
      return { ...state, loading: true };
    case educationActions.FETCH_EDUCATION_SUCCESS:
      return { ...state, loading: false, data: { ...action.payload } };
    case educationActions.FETCH_EDUCATION_FAILED:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default educationReducer;
