import React from "react";
import firebase from "../../firebase";

import Container from "../../components/Container";
import Row from "../../components/Row";
import Col from "../../components/Col";

import "./Saved.css";

class Saved extends React.Component {
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

  render() {
    console.log(this.state.people);
    const person = this.state.people[this.state.active];
    if (!person) {
      return null;
    }
    return (
      <div>
        <Container id="saved-container">
          <section className="display-item">
            <div className="wrapper">
              <Row>
                <Row>
                  <Col size="md-12">
                    <Row>
                      <h1 className="text-center">Saved Musicians</h1>
                      <h2 className="text-center">
                        View or Delete your Saved Musicians
                      </h2>
                    </Row>
                  </Col>
                </Row>
                <Row>
                <Col size="sm-3 md-3 lg-3">
                  <div className="card">
                      <Row>
                        <img src="https://place-hold.it/100x100" />
                      </Row>
                      <Row>
                        <h3>{person.user}</h3>
                      </Row>
                      <Row>
                        <h3>{person.title}</h3>
                      </Row>
                      <Row>
                        <button onClick={this.handleDelete}>Delete</button>
                      </Row>
                  </div>
                  </Col>
                <Col size="sm-3 md-3 lg-3">
                  <div className="card">
                      <Row>
                        <img src="https://place-hold.it/100x100" />
                      </Row>
                      <Row>
                        <h3>{person.user}</h3>
                      </Row>
                      <Row>
                        <h3>{person.title}</h3>
                      </Row>
                      <Row>
                        <button onClick={this.handleDelete}>Delete</button>
                      </Row>
                  </div>
                  </Col>
                  <Col size="sm-3 md-3 lg-3">
                  <div className="card">
                      <Row>
                        <img src="https://place-hold.it/100x100" />
                      </Row>
                      <Row>
                        <h3>{person.user}</h3>
                      </Row>
                      <Row>
                        <h3>{person.title}</h3>
                      </Row>
                      <Row>
                        <button onClick={this.handleDelete}>Delete</button>
                      </Row>
                  </div>
                  </Col>
                  <Col size="sm-3 md-3 lg-3">
                  <div className="card">
                      <Row>
                        <img src="https://place-hold.it/100x100" />
                      </Row>
                      <Row>
                        <h3>{person.user}</h3>
                      </Row>
                      <Row>
                        <h3>{person.title}</h3>
                      </Row>
                      <Row>
                        <button onClick={this.handleDelete}>Delete</button>
                      </Row>
                  </div>
                  </Col>

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
