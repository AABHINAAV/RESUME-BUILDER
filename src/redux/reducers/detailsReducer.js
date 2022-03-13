import initialState from "./initialStates.json";
import * as firestoreActions from "../actions/actions";

const detailsReducer = (state = initialState.firestore, action) => {
  switch (action.type) {
    case firestoreActions.SAVE_DETAILS_REQ:
      return { ...state, loading: true };
    case firestoreActions.SAVE_DETAILS_SUCCESS:
      return { ...state, loading: false };
    case firestoreActions.SAVE_DETAILS_FAILED:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default detailsReducer;
