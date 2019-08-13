import React from "react";
import { UserSession, Person } from "blockstack";
import Navbar from "./Navbar";

class Leaderboards extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      person: {
        name() {
          return "Anonymous";
        }
      },
      username: "",
      scores: [],
      isLoading: false
    };
  }

  componentDidMount() {
    this.fetchData();
  }
  fetchData() {
    const { userSession } = this.props;
    this.setState({ isLoading: true });
    const options = { decrypt: false };
    userSession
      .getFile("scores.json", options)
      .then(score => {
        var scores = JSON.parse(score || "[]");

        this.state.scores.push(scores);
        this.setState({
          person: new Person(userSession.loadUserData().profile),
          username: userSession.loadUserData().username,
          scores: this.state.scores
        });
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }
  render() {
    const username = this.props.userSession.loadUserData().username;
    const profile = this.props.userSession.loadUserData();
    const person = new Person(profile);

    return (
      <div>
        <Navbar
          username={username}
          user={person}
          signOut={this.props.handleSignOut}
        />
        <h1>Leaderboards</h1>
        <div className="col-md-12 statuses">
          {this.state.isLoading && <span>Loading...</span>}
          {this.state.scores.map(score => (
            <div className="status" key={score.id}>
              {score}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Leaderboards;
