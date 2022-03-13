import * as authActions from "./actions";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

// register user actions //
const registerReqObj = () => {
  return {
    type: authActions.SIGN_UP_REQUEST,
  };
};

const registerFailObj = (err) => {
  return {
    type: authActions.SIGN_UP_FAILED,
    payload: err.message,
  };
};

const registerSucObj = () => {
  return {
    type: authActions.SIGN_UP_SUCCESS,
  };
};

const removeError = () => {
  return {
    type: authActions.REMOVE_ERROR,
  };
};

export const registerUser = (userData) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch(registerReqObj());

    const firestore = getFirestore();

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, userData.email, userData.password)
      .then(async (data) => {
        const res = await firestore.collection("users").doc(data.user.uid).set({
          email: userData.email,
          password: userData.password,
        });
        dispatch(registerSucObj());
      })
      .catch((err) => {
        dispatch(registerFailObj(err));

        setTimeout(() => {
          dispatch(removeError());
        }, 2000);
      });
  };
};
//
//
//
// signin user actions //
const signinReqObj = () => {
  return {
    type: authActions.SIGN_IN_REQUEST,
  };
};

const signinFailObj = (err) => {
  return {
    type: authActions.SIGN_IN_FAILED,
    payload: err.message,
  };
};

const signinSucObj = () => {
  return {
    type: authActions.SIGN_IN_SUCCESS,
  };
};

export const signinUser = (userData) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch(signinReqObj());

    const auth = getAuth();

    try {
      await signInWithEmailAndPassword(auth, userData.email, userData.password);
      dispatch(signinSucObj());
    } catch (e) {
      dispatch(signinFailObj(e));
      setTimeout(() => {
        dispatch(removeError());
      }, 2000);
    }
  };
};
//
//
//
// signout user actions //
const signoutReqObj = () => {
  return {
    type: authActions.SIGN_OUT_REQUEST,
  };
};

const signoutFailObj = (e) => {
  return {
    type: authActions.SIGN_OUT_FAILED,
    payload: e.message,
  };
};

const signoutSucObj = () => {
  return {
    type: authActions.SIGN_OUT_SUCCESS,
  };
};

export const signoutUser = () => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch(signoutReqObj());

    const firebase = getFirebase();
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch(signoutSucObj());
      })
      .catch((e) => {
        dispatch(signoutFailObj(e));
        setTimeout(() => {
          dispatch(removeError());
        }, 2000);
      });
  };
};
