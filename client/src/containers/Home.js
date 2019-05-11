import React, { Component } from "react";
import { auth, provider } from "../firebase";
import "./Home.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavTabs from "../components/Nav";
import Dashboard from "./Dashboard";
import Discover from "./Discover";
import Saved from "./Saved";
import Lyrics from "./Covers";
import Songs from "./Songs";
import Logo from "../components/Logo"

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
      <div className="main-wrapper" id="container-about">
      <header>
            <div className="header">
              <h1><Logo></Logo>KC Artist Connect</h1>

              {this.state.user ? (
                <div className="login" onClick={this.logout}>
                  Logout
                </div>
              ) : (
                <div className="login" onClick={this.login}>
                  Login
                  <img className="google" width="60px" alt="Google Logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"/>
                </div>
              )}
            </div>
          </header>
        <div className="container">
          {this.state.user ? (
            <div>
              <div className="user-profile">
                <img alt="User" src={this.state.user.photoURL} />
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
                    render={props => (
                      <Saved user={this.state.user} {...props} />
                    )}
                  />
                  <Route
                    exact
                    path="/covers"
                    render={props => (
                      <Lyrics user={this.state.user} {...props} />
                    )}
                  />
                  <Route
                    exact
                    path="/songs"
                    render={props => (
                      <Songs user={this.state.user} {...props} />
                    )}
                  />
                  <Route
                    exact
                    path="/"
                    render={props => {
                      return (
                        <div>
                          <h2 className="about-header">
                            <Logo></Logo>
                            KC Artist Connect
                          </h2>
                          <p>
                            KC Artist Connect is a place to discover, connect,
                            and collaborate with other local musicians. Whether
                            you are looking to form a new band or to meet up for
                            a casual jam session, KC Artist Connect makes it
                            easy to find contacts for your next musical
                            adventure.
                          </p>
                          <p>
                            Create your personal music profile, discover fellow
                            local musicians, save new contacts, and browse songs
                            to get your creativity flowing. We can't wait to
                            hear what you come up with!
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
              <h2 className="about-header">
                <Logo></Logo>
                KC Artist Connect
              </h2>
              <p>
                KC Artist Connect is a place to discover, connect,
                and collaborate with other local musicians. Whether
                you are looking to form a new band or to meet up for
                a casual jam session, KC Artist Connect makes it
                easy to find contacts for your next musical
                adventure.
              </p>
              <p>
                Create your personal music profile, discover fellow
                local musicians, save new contacts, and browse songs
                to get your creativity flowing. We can't wait to
                hear what you come up with!
              </p>
            </div>
          )}
        </div>

            <footer style={{ height: 100 }}>
              <div className="menu">
            <div className="label">Information</div>
            <div className="spacer"></div>
            <a className="item" target="_blank" rel="noopener noreferrer" alt="project" href="https://github.com/beshoyr4/Project-3"><span>GitHub</span></a>
            <a className="item" target="_blank" rel="noopener noreferrer" href="https://github.com/ashbshaw"><span>Ashley</span></a>
            <a className="item" target="_blank" rel="noopener noreferrer" href="https://github.com/beshoyr4"><span>Beshoy</span></a>
            <a className="item" target="_blank" rel="noopener noreferrer" href="https://github.com/cait-sidener"><span>Cait</span></a>
            <a className="item" target="_blank" rel="noopener noreferrer" href="https://github.com/JoeScholz"><span>Joe</span></a>
          </div>
        </footer>
      </div>
    );
  }
}

export default Home;
