import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import rootReducer from "./redux/reducers/rootReducer";
import thunk from "redux-thunk";
import { Provider } from "react-redux";

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

import { reduxFirestore, getFirestore } from "redux-firestore";
import { ReactReduxFirebaseProvider, getFirebase } from "react-redux-firebase";
import { createFirestoreInstance } from "redux-firestore";

// 
// 
// 
// configuring and initializing the firebase
const firebaseConfig = {
  apiKey: "AIzaSyBwn767k483e1az7Doqp-1t0OB8ZwproqU",
  authDomain: "resume-builder-1576f.firebaseapp.com",
  projectId: "resume-builder-1576f",
  storageBucket: "resume-builder-1576f.appspot.com",
  messagingSenderId: "497947417398",
  appId: "1:497947417398:web:70b08805e18d929339f197",
  measurementId: "G-M50TQ9W0WT",
};
firebase.initializeApp(firebaseConfig);
firebase.firestore();

// 
// 
// 
// generating the redux global store
const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
    reduxFirestore(firebase)
  )
); //binding for redux to get firestore

// 
// 
// 
// rendering app
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <ReactReduxFirebaseProvider
        firebase={firebase}
        config={firebaseConfig}
        dispatch={store.dispatch}
        createFirestoreInstance={createFirestoreInstance}
      >
        <App />
      </ReactReduxFirebaseProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
