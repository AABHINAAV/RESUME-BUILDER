import * as firestoreActions from "./actions";

export const saveDetails = (data, id, skinCd) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();

    dispatch({ type: firestoreActions.SAVE_DETAILS_REQ });
    try {
      const res = await firestore
        .collection("users")
        .doc(id)
        .update({ [`details.${skinCd}`]: data });

      dispatch({ type: firestoreActions.SAVE_DETAILS_SUCCESS });
    } catch (e) {
      setTimeout(() => {
        dispatch({
          type: firestoreActions.SAVE_DETAILS_FAILED,
          payload: e.message,
        });
      }, 2000);
    }
  };
};
