import React from "react";
import { connect } from "react-redux";
import { isLoaded, isEmpty } from "react-redux-firebase";
import { Route, Redirect } from "react-router-dom";

function PrivateRoutes({ auth, component: Component, ...restProps }) {
  return (
    <Route
      {...restProps}
      render={(props) => {
        return isLoaded(auth) && !isEmpty(auth) ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        );
      }}
    />
  );
}

const mapStateToProps = (state) => {
  return { auth: state.firebase.auth };
};

export default connect(mapStateToProps)(PrivateRoutes);
