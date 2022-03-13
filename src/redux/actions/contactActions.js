import * as contactActions from "./actions";

export const setContact = (contact) => {
  return {
    type: contactActions.SET_CONTACT,
    payload: contact,
  };
};

export const updateContact = (contact) => {
  return {
    type: contactActions.UPDATE_CONTACT,
    payload: contact,
  };
};

export const fetchContactDetails = (skinCd, id) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch({ type: contactActions.FETCH_CONTACT_REQ });

    try {
      const firestore = getFirestore();
      let res = await firestore.collection("users").doc(id).get();
      res = res.data()["details"][skinCd][skinCd]["contactSection"];

      dispatch({ type: contactActions.FETCH_CONTACT_SUCCESS, payload: res });
    } catch (e) {
      setTimeout(() => {
        dispatch({
          type: contactActions.FETCH_CONTACT_FAILED,
          payload: "No Previous Data For This Template...",
        });
      }, 2000);
    }
  };
};
