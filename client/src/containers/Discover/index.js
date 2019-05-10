import React from "react";
import firebase from "../../firebase";
import { Animated } from "react-animated-css";

import "./style.css";

class Discover extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      people: [],
      active: 0,
      currentSaved: []
    };
  }

  componentDidMount() {
    firebase
      .database()
      .ref("items")
      .on("value", snapshot => {
        let items = snapshot.val();
        let newState = [];

        for (let item in items) {
          newState.push({
            id: item,
            title: items[item].title,
            user: items[item].user,
            profilePic: items[item].profilePicUrl,
            email: items[item].email
          });
        }
        this.setState({
          people: newState
        });
      });

    let ref = firebase.database().ref("saved");
    ref
      .orderByChild("currentuser")
      .equalTo(this.props.user.displayName)
      .on("value", snapshot => {
        let saved = snapshot.val();
        const faveArr = [];
        for (let fave in saved) {
          const user = saved[fave].stored.user;
          const instrument = saved[fave].stored.title;
          const userId = saved[fave].stored.id;
          const email = saved[fave].stored.email;
          const profilePic = saved[fave].stored.profilePic;
          const faveId = fave;

          faveArr.push({
            user,
            email,
            instrument,
            userId,
            faveId,
            profilePic
          });
        }
        this.setState({
          currentSaved: faveArr
        });
      });
  }

  handleBtnClick = event => {
    // Load next person when button is clicked
    let currentActive = this.state.active;
    if (currentActive === this.state.people.length - 1) {
      currentActive = 0;
    } else {
      currentActive++;
    }
    this.setState(state => {
      return {
        active: currentActive
      };
    });
  };

  handleYeaClick = e => {

    e.preventDefault();

    const currentYes = this.state.people[this.state.active];
    let alreadyPaired = false;
    const currentSaved = this.state.currentSaved;

    if (currentYes.user === this.props.user.displayName) {
      alert("You can't start a band with yourself!");
      return;
    }
    for (let i = 0; i < currentSaved.length; i++) {
      if (
        currentSaved[i].user === currentYes.user &&
        currentSaved[i].instrument === currentYes.title
      ) {
        alreadyPaired = true;
        break;
      }
    }
    if (alreadyPaired) {
      alert("You've already been paired with this user.");
    } else {
      const savedRef = firebase.database().ref("saved");
      const saved = {
        // this is the logged in user:
        currentuser: this.props.user.displayName || this.props.user.email,
        // this is the card info to be saved:
        stored: this.state.people[this.state.active]

        // expertise: this.state.expertise,
        // experience: this.state.experience
        // title: this.state.instrument,
      };
      savedRef.push(saved);
      this.setState({
        id: "",
        instrument: "",
        expertise: "",
        experience: "",
        username: ""
        
      });

      let currentActive = this.state.active;
      if (currentActive === this.state.people.length - 1) {
        currentActive = 0;
      } else {
        currentActive++;
      }
      this.setState(state => {
        return {
          active: currentActive
        };
      });
    }
  };

  render() {
    const person = this.state.people[this.state.active];
    if (!person) {
      return null;
    }
    return (
        <div className="container" id="discover-container">
            <div className="wrapper">
              <div className="row">
                <div className="col-md-12">
                  <h2>Discover New Contacts</h2>
                  <br />
                </div>
              </div>
                    <Animated
                      animationIn="fadeInDownBig"
                      animationOut="fadeOut"
                      isVisible={true}
                  >                    
                {/* <div className="row"> */}
                  {/* <div className="col-md-12"> */}
                    <div className="card">
                        {/* <div className="row"> */}
                          {/* <div className="col-md-12"> */}

                          <div>
                            <img className="imageCont" src={person.profilePic} alt={person.title} />
                          </div>
                        {/* </div> */}
                        <div className="row">
                          <div className="col-md-12">
                            <h3 className="discover-info">Name: {person.user}</h3>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12">
                            <h3 className="discover-info">Instrument: {person.title}</h3>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-12">
                            <button className="yes-or-no" onClick={this.handleBtnClick}>Next</button>
                            <button className="yes-or-no" onClick={this.handleYeaClick}>
                              Need
                            </button>
                          </div>
                        </div>
                      {/* </div> */}
                  </div>
                {/* </div> */}
                </Animated>

              </div>
            </div>
    );
  }
}

export default Discover;
