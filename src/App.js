import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Signin from "./components/Signin";
import Blockris from "./components/blockris/Blockris";
import Profile from "./components/Profile";
import Leaderboard from "./components/Leaderboard";
import { UserSession } from "blockstack";
import { appConfig } from "./assets/constants";

const userSession = new UserSession({ appConfig });

export default class App extends Component {
  handleSignIn(e) {
    e.preventDefault();
    userSession.redirectToSignIn();
  }

  handleSignOut(e) {
    e.preventDefault();
    userSession.signUserOut(window.location.origin);
  }

  render() {
    return (
      <div className="site-wrapper">
        <div className="site-wrapper-inner">
          {!userSession.isUserSignedIn() ? (
            <Signin
              userSession={userSession}
              handleSignIn={this.handleSignIn}
            />
          ) : (
            <Switch>
              <Route
                exact
                path="/"
                render={routeProps => (
                  <Dashboard
                    userSession={userSession}
                    handleSignOut={this.handleSignOut}
                    {...routeProps}
                  />
                )}
              />
              <Route
                exact
                path="/profile"
                render={routeProps => (
                  <Profile
                    userSession={userSession}
                    handleSignOut={this.handleSignOut}
                    {...routeProps}
                  />
                )}
              />
              <Route
                exact
                path="/blockris"
                render={routeProps => (
                  <Blockris
                    userSession={userSession}
                    handleSignOut={this.handleSignOut}
                    {...routeProps}
                  />
                )}
              />

              <Route
                exact
                path="/leaderboard"
                render={routeProps => (
                  <Leaderboard
                    userSession={userSession}
                    handleSignOut={this.handleSignOut}
                    {...routeProps}
                  />
                )}
              />
            </Switch>
          )}
        </div>
      </div>
    );
  }

  componentWillMount() {
    if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then(userData => {
        //if (!userData.username) {
        //  throw new Error('This app requires a username.')
        //}
        window.location = window.location.origin;
      });
    }
  }
}
