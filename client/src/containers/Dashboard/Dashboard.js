import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import Container from "../../components/Container";
import Row from "../../components/Row";
import Col from "../../components/Col";
import firebase, { auth, provider } from "../../firebase.js";
import axios from "axios";

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
      selectedFile: null
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

  // Profile Photo Uploader

  fileSelectedHandler = event => {
    event.preventDefault();
    this.setState({
      selectedFile: event.target.files[0]
    })
  }

  fileUploadHandler = (event) => {
    event.preventDefault();
    const fd = new FormData();
    fd.append("image", this.state.selectedFile, this.state.selectedFile.name);
    axios.post("https://us-central1-profile-7ee82.cloudfunctions.net/uploadFile", fd, {
      onUploadProgress: progressEvent => {
        console.log("Upload Progress " + Math.round(progressEvent.loaded / progressEvent.total * 100) + "%")
      }
    })
      .then(res => {
        console.log(res);
      });
  };

  // End Profile Photo Uploader

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
                            <div className="picture">
                              <input
                                style={{ display: "none" }}
                                type="file"
                                onChange={this.fileSelectedHandler}
                                ref={fileInput => this.fileInput = fileInput} />
                              <button onClick={() => this.fileInput.click()}>Pick File</button>
                              <button onClick={this.fileUploadHandler}>Upload</button>
                            </div>
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
