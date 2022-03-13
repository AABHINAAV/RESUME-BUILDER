import * as contactActions from "../actions/actions";
import initialState from "./initialStates.json";

const contactReducer = (state = initialState.contact, action) => {
  switch (action.type) {
    case contactActions.SET_CONTACT:
      return { ...state, data: { ...action.payload } };
    case contactActions.UPDATE_CONTACT:
      return { ...state, data: { ...action.payload } };
    case contactActions.FETCH_CONTACT_REQ:
      return { ...state, loading: true };
    case contactActions.FETCH_CONTACT_SUCCESS:
      return { ...state, loading: false, data: { ...action.payload } };
    case contactActions.FETCH_CONTACT_FAILED:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default contactReducer;
