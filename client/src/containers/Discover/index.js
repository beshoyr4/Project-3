import React from "react";
import firebase from "../../firebase";

import Container from "../../components/Container";
import Row from "../../components/Row";
import Col from "../../components/Col";
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
};

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
            user: items[item].user
          });
        }
        console.log(items);
        this.setState({
          people: newState
        });
      });
  }

    componentDidMount() {
        firebase.database().ref('items')
            .on('value', (snapshot) => {
                let items = snapshot.val();
                let newState = [];
                for (let item in items) {
                    newState.push({
                        id: item,
                        title: items[item].title,
                        user: items[item].user
                    });
                };
                this.setState({
                    people: newState
                });
            });

            let ref = firebase.database().ref("saved");
            console.log(this.props.user.displayName);
                ref
                  .orderByChild("currentuser")
                  .equalTo(this.props.user.displayName)
                  .on("value", snapshot => {
                    let saved = snapshot.val();
                    const faveArr = [];
            console.log(saved);
                    for (let fave in saved) {
                      const user = saved[fave].stored.user;
                      const instrument = saved[fave].stored.title;
                      const userId = saved[fave].stored.id;
                      const faveId = fave;
            
                      faveArr.push({
                        user,
                        instrument,
                        userId,
                        faveId
                      });
                    }
                    this.setState({
                      currentSaved: faveArr
                    });
                  });
            
    };

    handleBtnClick = event => {
        // Load next person when button is clicked
        let currentActive = this.state.active;
        if (currentActive === this.state.people.length -1) {
            currentActive = 0;
        } else {
            currentActive ++
        };
        this.setState(state => {
            return {
                active: currentActive
            };
        });
        console.log(this.state.active);
      };

    //   handleYesBtnClick = event => {
    //       this.setState(state => {
    //           return {
    //               favorites: [...this.state.favorites, this.state.people[this.state.active].id]
    //                 };
    //             });
    //       console.log(this.state.favorites);
    //       this.handleBtnClick(event);
    //   }

    //   componentWillUnmount() {
    //     firebase.database().ref('items')
    //   }


  handleYeaClick = e => {
    console.log("saved");

    e.preventDefault();
    const currentYes = this.state.people[this.state.active];
    let alreadyPaired = false;
    const currentSaved = this.state.currentSaved;
    console.log(currentYes);
    if(currentYes.user === this.props.user.displayName){
      alert("You can't start a band with yourself!")
      return
    }
    for(let i=0; i<currentSaved.length; i++){
      if(currentSaved[i].user === currentYes.user && currentSaved[i].instrument === currentYes.title){
        alreadyPaired = true;
        break
      }
    }
    if(alreadyPaired){
      alert("You've already been paired with this user.")
    }else{
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
    console.log(this.state.currentSaved);
    const person = this.state.people[this.state.active];
    if (!person) {
      return null;
    }
    return (
      <div>
        <Container id="discover-container">
          <section className="display-item">
            <div className="wrapper">
              <Row>
                <Row>
                  <Col size="md-12">
                    <Row>
                      <h1 className="text-center">Find Musicians</h1>
                      <br />
                      <h2 className="text-center">
                        Thumbs up on any musican you would like to save!
                      </h2>
                      <br />
                    </Row>
                  </Col>
                </Row>
                <Row>
                  <div className="card">
                    <Col size="md-12">
                      <Row>
                        <img src="https://place-hold.it/200x200" />
                      </Row>
                      <Row>
                        <h3>Name: {person.user}</h3>
                      </Row>
                      <Row>
                        <h3>Instrument: {person.title}</h3>
                      </Row>
                      <Row>
                        <button onClick={this.handleYeaClick}>Hell Yea</button>
                        <button onClick={this.handleBtnClick}>No thanks</button>
                      </Row>
                    </Col>
                  </div>
                </Row>
              </Row>
            </div>
          </section>
        </Container>
      </div>
    );
  }
}

export default Discover;
