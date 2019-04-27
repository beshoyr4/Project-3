import React, { Component } from "react";
import "./App.css";
import { auth, provider } from "./firebase.js";
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavTabs from "./components/Nav";
import Dashboard from "./containers/Dashboard";
import Discover from "./containers/Discover";
import Saved from "./containers/Saved";
import Lyrics from "./containers/Covers";

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null
    };
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({
          user
        });
      }
    });
  }

  logout() {
    auth.signOut().then(() => {
      this.setState({
        user: null
      });
    });
  }
  login() {
    auth.signInWithPopup(provider).then(result => {
      const user = result.user;
      this.setState({
        user
      });
      // Search Firebase for user with that uid
      // Set this.state.user.key to object key
    });
  }

  render() {
    return (
      <div className="app">
        <header>
          <div className="wrapper">
            <h1>I Play Music</h1>
            {this.state.user ? (
              <button onClick={this.logout}>Logout</button>
            ) : (
                <button onClick={this.login}>Log In</button>
              )}
          </div>
        </header>
        {this.state.user ? (
          <div>
            <div className="user-profile">
              <img src={this.state.user.photoURL} />
            </div>
            <Router>
              <div>
                <NavTabs />
                <Route
                  exact
                  path="/dashboard"
                  render={props => (
                    <Dashboard user={this.state.user} {...props} />
                  )}
                />
                <Route
                  exact
                  path="/discover"
                  render={props => (
                    <Discover user={this.state.user} {...props} />
                  )}
                />
                <Route
                  exact
                  path="/saved"
                  render={props => <Saved user={this.state.user} {...props} />}
                />
                <Route
                  exact
                  path="/covers"
                  render={props => <Lyrics user={this.state.user} {...props} />}
                />
              </div>
            </Router>
            )}
          </div>
        ) : (
            <div className="wrapper">
              <h1
                style={{
                  textAlign: "center",
                  paddingTop: "70px",
                  fontSize: "60px",
                  color: "#0f3d5d",
                  paddingBottom: "5px"
                }}
              >
                Welcome
            </h1>

              <p
                style={{
                  textAlign: "center",
                  color: "#0f3d5d",
                  fontWeight: "bold",
                  fontSize: "25px"
                }}
              >
                Place where you can connect with other musicians
            </p>
            </div>
          )}
      </div>
    );
  }
}

export default App;
