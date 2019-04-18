import firebase, { auth, provider } from './firebase.js';
import React, { Component } from 'react';
import './App.css';

class App extends Component {
    constructor() { 
      super();
      this.login = this.login.bind(this); 
      this.logout = this.logout.bind(this);
      this.state = {
        currentItem: '',
        username: '',
        items: [],
        user: null 
      }
    }

    handleChange(e) {
      /* ... */
    }

    handleSubmit(e) {
      // ....
      const item = {
        title: this.state.currentItem,
        user: this.state.user.displayName || this.state.user.email
      }
      // ....
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
    };

    render() {
      return (
        <div className='app'>
          <header>
            <div className="wrapper">
              <h1>Project 3</h1>
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
            </div>
            :
            <div className='wrapper'>
              <p>You must be logged in to see the potluck list and submit to it.</p>
            </div>
          }
          </div>      
          );
      }
  }
export default App;