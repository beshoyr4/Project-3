import React from "react";
// import firebase from "../../firebase";
import firebase, { auth, provider } from "../../firebase.js";

import Container from "../../components/Container";
import Row from "../../components/Row";
import Col from "../../components/Col";
import { Animated } from "react-animated-css";

import "./Saved.css";

class Saved extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSaved: []
    };
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    let ref = firebase.database().ref("saved");

    ref
      .orderByChild("currentuser")
      .equalTo(this.props.user.displayName)
      .on("value", snapshot => {
        let saved = snapshot.val();
        console.log(saved);
        const faveArr = [];

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
    // });
  }
  handleDelete(objectId) {
    let ref = firebase.database().ref("saved");
    ref.child(objectId).remove();
    console.log(objectId);
  }

  render() {
    console.log(this.state.currentSaved);
    if (this.state.currentSaved.length === 0) {
      return <h1>No Saved</h1>;
    }
    return (
      <div>
        <Container id="saved-container">
          <section className="display-item">
            <div className="wrapper">
              <Row>
                <Row>
                  <Animated
                    animationIn="zoomInDown"
                    animationOut="fadeOut"
                    animationInDuration="1500"
                    isVisible={true}
                  >
                    <Col size="md-12">
                      <Row>
                        <h2 className="text-center">
                          View or Delete your Saved Musicians
                        </h2>
                      </Row>
                    </Col>
                  </Animated>
                </Row>
                <Row>
                  <Animated
                    animationIn="zoomInUp"
                    animationOut="fadeOut"
                    animationInDuration="1500"
                    isVisible={true}
                  >
                    {this.state.currentSaved.map(fave => (
                      <Col size="sm-3 md-3 lg-3" key={fave.faveId}>
                        <div className="card">
                          <Row>
                            <img src="https://place-hold.it/100x100" />
                          </Row>
                          <Row>
                            <h2>{fave.user}</h2>
                          </Row>
                          <Row>
                            <p>{fave.instrument}</p>
                          </Row>
                          <Row>
                            <button
                              onClick={() => this.handleDelete(fave.faveId)}
                            >
                              Delete
                            </button>
                          </Row>
                        </div>
                        <div />
                      </Col>
                    ))}
                  </Animated>
                </Row>
              </Row>
            </div>
          </section>
        </Container>
      </div>
    );
  }
}

export default Saved;
