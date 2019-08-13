import React, { Component } from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { UserSession, Person } from "blockstack";
import { appConfig } from "../assets/constants";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: [],
      value: ""
    };
  }
  render() {
    const username = this.props.userSession.loadUserData().username;
    const profile = this.props.userSession.loadUserData();
    const person = new Person(profile);

    return (
      <div className="Dashboard">
        <Navbar
          username={username}
          user={person}
          signOut={this.props.handleSignOut}
        />
        <div className="row justify-content-center">
          <h3 className="user-info">{username}'s Portal</h3>
        </div>
        <br />
        <div className="column justify-content-center">
          <Link to="/profile">
            <h1>Profile</h1>
          </Link>
          <Link to="/blockris">
            <h1>Play Now</h1>
          </Link>
          <Link to="/leaderboard">
            <h1>Leaderboard</h1>
          </Link>
          <h1>Tournaments (Coming Soon)</h1>
          <h1>Battle (Coming Soon)</h1>
        </div>
      </div>
    );
  }
}

// Made this a default prop (instead of using this.userSession) so a dummy userSession
// can be passed in for testing purposes
Dashboard.defaultProps = {
  userSession: new UserSession(appConfig)
};

export default Dashboard;
