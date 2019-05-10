import React from "react";
import firebase from "../../firebase.js";
import Container from "../../components/Container";

import { Animated } from "react-animated-css";
import Modal from "../Modal";
import "./Saved.css";

class Saved extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSaved: [],
      isShowing: false,
      sidx: null
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
            profilePic,
            faveId
          });
        }
        this.setState({
          currentSaved: faveArr
        });
      });
  }

  handleDelete(objectId) {
    let ref = firebase.database().ref("saved");
    ref.child(objectId).remove();
  }

  openModalHandler = evt => {
    const { sidx } = evt.currentTarget.dataset;
    this.setState({
      isShowing: true,
      sidx
    });
  };

  closeModalHandler = evt => {

    this.setState({
      isShowing: false
    });
  };

  renderModalContent() {
    const data = this.state.currentSaved[this.state.sidx]
    
    return (
      <div>
        <img src={data.profilePic} alt={data.user} />
        <h1>{data.user}</h1>
        <h2>{data.instrument}</h2>
        <h2>{data.email}</h2>
      </div>
    );
  }

  render() {
    if (this.state.currentSaved.length === 0) {
      return <h2 id="no-saved">No Saved</h2>;
    }

    return (
      <div>
        <Container id="saved-container">
          <section className="display-item">
            <div className="wrapper">
            <h2 className="text-center">View or Delete Contacts</h2>

              <Animated
                animationIn="bounceInLeft"
                animationOut="fadeOut"
                isVisible={true}
              >
              </Animated>
              <Animated
                animationIn="bounceInLeft"
                animationOut="fadeOut"
                isVisible={true}
              >
                {this.state.currentSaved.map((fave, idx) => (
                  <div className="card">
                    <img
                      className="imageContainer"
                      src={fave.profilePic}
                      alt={fave.title}
                    />
                    <h2>{fave.user}</h2>

                    <p>{fave.instrument}</p>

                    <button onClick={() => this.handleDelete(fave.faveId)}>
                      Delete
                    </button>
                    <button
                      className="open-modal-btn"
                      data-sidx={idx}
                      onClick={this.openModalHandler}
                    >
                      Open
                    </button>
                  </div>
                ))}
              </Animated>
            </div>
          </section>
        </Container>
        {this.state.isShowing && (
          <Modal onClose={this.closeModalHandler}>
            {this.renderModalContent()}
          </Modal>
        )}
      </div>
    );
  }
}

export default Saved;
