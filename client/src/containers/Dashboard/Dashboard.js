import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import ImageUploader from "react-images-upload";

import Container from "../../components/Container";
import Row from "../../components/Row";
import Col from "../../components/Col";
import firebase, { auth, provider } from "../../firebase.js";

import "./Dashboard.css";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      instrument: "",
      expertise: "",
      experience: "",
      username: "",
      items: [],
      pictures: []
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const itemsRef = firebase.database().ref("items");
    const item = {
      title: this.state.instrument,
      user: this.props.user.displayName || this.props.user.email,
      expertise: this.state.expertise,
      experience: this.state.experience
    };
    itemsRef.push(item);
    this.setState({
      instrument: "",
      expertise: "",
      experience: "",
      username: ""
    });
  };

  componentDidMount() {
    const itemsRef = firebase.database().ref("items");
    itemsRef
      .orderByChild("user")
      .equalTo(this.props.user.displayName || this.props.user.email)
      .on("value", snapshot => {
        let items = snapshot.val();
        let newState = [];
        console.log(items);
        for (let item in items) {
          newState.push({
            id: item,
            ...items[item]
          });
        }
        this.setState({
          items: newState
        });
      });
  }

  removeItem(itemId) {
    const itemRef = firebase.database().ref(`/items/${itemId}`);
    itemRef.remove();
  }

  onDrop = picture => {
    this.setState({
      pictures: this.state.pictures.concat(picture)
    });
  };

  render() {
    if (this.props.user === null) {
      return (
        <Redirect
          to={{
            pathname: "/",
            state: { from: this.props.location }
          }}
        />
      );
    }

    return (
      <div>
        <Container id="dashboard-container">
          <Row>
            <Col size="md-12">
              <section className="add-item">
                <form onSubmit={this.handleSubmit}>
                  <input
                    type="text"
                    required="required"
                    name="username"
                    placeholder="What's your name?"
                    defaultValue={
                      this.props.user.displayName || this.props.user.email
                    }
                  />
                  <ImageUploader
                    withIcon={true}
                    buttonText="Choose images"
                    onChange={this.onDrop}
                    imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                    maxFileSize={5242880}
                  />
                  <input
                    type="text"
                    required="required"
                    name="instrument"
                    placeholder="What instrument do you play?"
                    onChange={this.handleChange}
                    value={this.state.instrument}
                  />
                  <input
                    type="text"
                    required="required"
                    name="expertise"
                    placeholder="Novice, Ameteur, or Expert"
                    onChange={this.handleChange}
                    value={this.state.expertise}
                  />
                  <input
                    type="text"
                    name="experience"
                    required="required"
                    placeholder="Start a Band or Jam Session"
                    onChange={this.handleChange}
                    value={this.state.experience}
                  />

                  <button>Submit</button>
                </form>
              </section>
            </Col>
          </Row>
          <Row>
            <Col size="md-12">
              <section className="display-item">
                <div className="wrapper">
                  <ul>
                    {this.state.items.map(item => {
                      return (
                        <li key={item.id}>
                          <h3>{item.user}</h3>
                          <p>
                            Instrument: {item.title}
                            <br />
                            Experience Level: {item.expertise}
                            <br />
                            Looking: {item.experience}
                            <br />
                            {item.user === this.props.user.displayName ||
                            item.user === this.props.user.email ? (
                              <button onClick={() => this.removeItem(item.id)}>
                                Delete
                              </button>
                            ) : null}
                          </p>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </section>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Dashboard;
