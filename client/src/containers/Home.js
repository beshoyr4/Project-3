import React, { Component } from "react";
import { auth, provider } from "../firebase";

import "./Home.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavTabs from "../components/Nav";
import Dashboard from "./Dashboard";
import Discover from "./Discover";
import Saved from "./Saved";
import Lyrics from "./Covers";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      user: null
    };
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

  logout = () => {
    auth.signOut().then(() => {
      this.setState({
        user: null
      });
    });
  };
  login = () => {
    auth.signInWithPopup(provider).then(result => {
      const user = result.user;
      this.setState({
        user
      });
      // Search Firebase for user with that uid
      // Set this.state.user.key to object key
    });
  };

  render() {
    return (
      <div className="container" id="container-about">
        <header>
          <div className="wrapper">
            <h1>KC Artist Connect</h1>
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
                <Route
                  exact
                  path="/"
                  render={props => {
                    return (
                      <div>
                        <p>
                          <br />
                          KC Artist Connect is a place to discover, connect, and
                          collaborate with other local musicians. Whether you
                          are looking to form a new band or to meet up for a
                          casual jam session, KC Artist Connect makes it easy to
                          find contacts for your next musical adventure.
                          <br />
                          <br />
                          Create your personal music profile, discover fellow
                          local musicians, save new contacts, and browse songs
                          to get your creativity flowing. We can't wait to hear
                          what you come up with!
                        </p>
                      </div>
                    );
                  }}
                />
              </div>
            </Router>
          </div>
        ) : (
          <div className="wrapper" id="wrapper">
            <h1>KC Artist Connect</h1>
            <p>Discover, Connect, and Collaborate with Local Musicians</p>
          </div>
        )}
        <div class="footer">
          <div class="menu">
            <div class="label">Information</div>
            <div class="spacer" />
            <div class="item">
              <span>GitHub</span>
            </div>
            <div class="item">
              <span>Instagram</span>
            </div>
            <div class="item">
              <span>LinkedIn</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
