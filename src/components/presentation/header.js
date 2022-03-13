import React from "react";
import { NavLink } from "react-router-dom";

import logo from "../../static/images/logo.png";

import { signoutUser } from "../../redux/actions/authActions";
import { isLoaded, isEmpty } from "react-redux-firebase";
import { connect } from "react-redux";

const Header = (props) => {
  const auth = props.auth;

  const handleLogOut = () => {
    props.signOut();
  };

  return (
    <header className="header">
      <nav className="nav">
        {/* logo */}
        <a href="/" className="holder-logo">
          <img className="logo" src={logo}></img>
        </a>

        <div className="header-links full-height">
          {isLoaded(auth) && !isEmpty(auth) ? (
            <>
              <ul>
                <li className="signin ">
                  <NavLink className="  " to="/">
                    Logged in as {auth.email}
                  </NavLink>
                </li>
                <li className="signin">
                  <button className="text-blue btnv-3" onClick={handleLogOut}>
                    Signout
                  </button>
                </li>
              </ul>
            </>
          ) : (
            <ul>
              <li className="signup ">
                <NavLink className=" btnv-1" to="/register">
                  Register
                </NavLink>
              </li>
              <li className="signin">
                <NavLink className="text-blue btnv-3" to="/login">
                  Sign In
                </NavLink>
              </li>
            </ul>
          )}

          <ul id="nav-mid">
            <li>
              <NavLink className="btn-nvt-gm" to="/resume-templates">
                Resume Templates
              </NavLink>
            </li>
            <li className="holder-pricing">
              <NavLink className="btn-nvt-gm" to="/about-us">
                About Us
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signoutUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
