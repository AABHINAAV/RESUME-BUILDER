import * as educationActions from "./actions";

export const setEducation = (education) => {
  return {
    type: educationActions.SET_EDUCATION,
    payload: education,
  };
};

export const updateEducation = (education) => {
  return {
    type: educationActions.UPDATE_EDUCATION,
    payload: education,
  };
};

export const fetchEducationDetails = (skinCd, id) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch({ type: educationActions.FETCH_EDUCATION_REQ });

    try {
      const firestore = getFirestore();
      let res = await firestore.collection("users").doc(id).get();
      res = res.data()["details"][skinCd][skinCd]["educationSection"];

      dispatch({
        type: educationActions.FETCH_EDUCATION_SUCCESS,
        payload: res,
      });
    } catch (e) {
      setTimeout(() => {
        dispatch({
          type: educationActions.FETCH_CONTACT_FAILED,
          payload: "No Previous Data For This Template...",
        });
      }, 2000);
    }
  };
};
