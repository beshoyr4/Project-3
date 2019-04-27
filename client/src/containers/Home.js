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
  }
  login = () => {
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
    <div className="container" id="container-about">
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
                render={props => (
                <Saved user={this.state.user} {...props} />
                )}
              />
              <Route
                exact
                path="/covers"
                render={props => <Lyrics user={this.state.user} {...props} />}
              />
            <Route exact path="/" render={(props)=>{
              return (
                <div>
                  <h1>Welcome</h1>
                  <p>
                    here!!!!!!
                    <br />
                    Place where you can connect with other musicians
                  </p>
                </div>
              )
            }} />
          </div>
          </Router>
        </div>
        
      ) : (
          <div className="wrapper" id="wrapper">
            <h1>Welcome</h1>
            <p>
              Place where you can connect with other musicians
            </p>
          </div>
        )}
    </div>
    );
  }
}

export default Home;

