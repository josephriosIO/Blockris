import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { loginIn } from "../state/actions/index";

const PrivateRoute = ({ component: Component, ...rest }, props) => {
  const { userSession } = props;
  return (
    <Route
      {...rest}
      render={props => (2 ? <Component /> : <Redirect to="/" />)}
    />
  );
};

const mapStateToProps = state => ({
  appConfig: state.mainReducers.appConfig,
  userSession: state.mainReducers.userSession
});

export default connect(
  mapStateToProps,
  { loginIn }
)(PrivateRoute);
