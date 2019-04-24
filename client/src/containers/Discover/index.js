import React from "react";
import firebase from "../../firebase";

import Container from "../../components/Container";
import Row from "../../components/Row";
import Col from "../../components/Col";

import "./style.css";

class Discover extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      people: [],
      active: 0
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
            user: items[item].user
          });
        }
        console.log(items);
        this.setState({
          people: newState
        });
      });
  }

  handleBtnClick = event => {
    // Load next person when button is clicked
    console.log("here");
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
    console.log("saved");

    e.preventDefault();
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
  };

  render() {
    console.log(this.state.people);
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
