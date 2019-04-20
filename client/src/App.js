import React, { Component } from 'react';
import './App.css';
import firebase, { auth, provider } from './firebase.js';
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavTabs from "./components/Nav";
import Dashboard from "./containers/Dashboard";
import Discover from "./containers/Discover";
import Saved from "./containers/Saved";


class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null
    }
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }
  
  logout() {
    auth.signOut()
    .then(() => {
      this.setState({
        user: null
      });
    });
  }
  login() {
    auth.signInWithPopup(provider)
    .then((result) => {
      const user = result.user;
      this.setState({
        user
      });
    });
  }
  
  componentDidMount() {
    auth.onAuthStateChanged((user) => {
    if (user) {
      this.setState({ user });
    }
  });
    
  }
  


  render() {
    return (
      <div className='app'>
      <header>
        <div className="wrapper">
          <h1>I Play Music</h1>
          {this.state.user ?
            <button onClick={this.logout}>Logout</button>                
            :
            <button onClick={this.login}>Log In</button>              
          }
        </div>
      </header>
      {this.state.user ?
        <div>
          <div className='user-profile'>
            <img src={this.state.user.photoURL} />
          </div>
        
          <Router>
            <div>
            <NavTabs />
              <Route exact path="/dashboard" render={(props) => <Dashboard user={this.state.user} {...props} />} />
              <Route exact path="/discover" render={(props) => <Discover user={this.state.user} {...props} />} />
              <Route exact path="/saved" render={(props) => <Saved user={this.state.user} {...props} />} />
            </div>
          </Router>
          </div>
        :
        <div className='wrapper'>
          <p>Welcome to our app. This is our about page that explains what this app is all about.
            Log in to head over to your dashboard!
          </p>
        </div>
      }
    </div>
    )
  }
}

export default App;