import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import Container from "../../components/Container";
import firebase, { auth, provider, database } from "../../firebase.js";
import { Animated } from "react-animated-css";

import "./Dashboard.css";

const storage = firebase.storage().ref();

const imgStyle = {
  maxHeight: "400px",
  maxWidth: "400px"
};

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      instrument: "",
      expertise: "",
      experience: "",
      username: "",
      items: [],
      selectedFile: null,
      email: ""
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
      experience: this.state.experience,
      email: this.state.email
    };
    itemsRef.push(item);
    this.setState({
      instrument: "",
      expertise: "",
      experience: "",
      username: "",
      email: ""
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
    });
  };

  fileUploadHandler = () => {
    console.log(this.state.selectedFile);
    const { selectedFile } = this.state;

    let uploadTask = storage
      .child(`profile/${selectedFile.name}`)
      .put(selectedFile);

    uploadTask.on(
      "state_changed",
      snapshot => {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        // eslint-disable-next-line default-case
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log("Upload is paused");
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log("Upload is running");
            break;
        }
      },
      function(error) {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          console.log("File available at", downloadURL);
          // query to add profile pic url to firebase db under user
          console.log(this.state.items);
          firebase
            .database()
            .ref(`items/${this.state.items[0].id}`)
            .update({
              profilePicUrl: downloadURL
            });
          if (downloadURL) {
            this.setState({ image: downloadURL });
          }
        });
      }
    );
  };

  // End Profile Photo Uploader

  render() {
    const imgStyle = {
      maxHeight: "200px",
      maxWidth: "200px"
    };

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
          <Animated
            animationIn="bounceInLeft"
            animationOut="fadeOut"
            isVisible={true}
          >
            <div>
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
                    name="email"
                    placeholder="What's your email?"
                    onChange={this.handleChange}
                    value={this.state.email}
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
            </div>
          </Animated>
          <Animated
            animationIn="bounceInRight"
            animationOut="fadeOut"
            isVisible={true}
          >
            <section className="display-item">
              <div className="wrapper">
                <ul>
                  {this.state.items.map(item => {
                    return (
                      <li key={item.id}>
                        <h3>{item.user}</h3>
                        <p>
                          Email: {item.email}
                          <br />
                          Instrument: {item.title}
                          <br />
                          Experience Level: {item.expertise}
                          <br />
                          Looking: {item.experience}
                          <br />
                          {item.user === this.props.user.displayName ||
                          item.user === this.props.user.email ? (
                            <button onClick={() => this.removeItem(item.id)}>
                              Delete Profile
                            </button>
                          ) : null}
                          <div className="picture">
                            {this.state.items[0].profilePicUrl && (
                              <img
                                src={this.state.items[0].profilePicUrl}
                                alt="Me"
                                style={imgStyle}
                                className="imgContainer"
                              />
                            )}
                            <input
                              style={{ display: "none" }}
                              type="file"
                              onChange={this.fileSelectedHandler}
                              ref={fileInput => (this.fileInput = fileInput)}
                            />
                            <button onClick={() => this.fileInput.click()}>
                              Pick File
                            </button>
                            <button onClick={this.fileUploadHandler}>
                              Upload
                            </button>
                          </div>
                        </p>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </section>
          </Animated>
        </Container>
      </div>
    );
  }
}

export default Dashboard;
