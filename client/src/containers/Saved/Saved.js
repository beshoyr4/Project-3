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
      saved: [],
      store: 0
    };
  }

  componentDidMount() {
  
    // let ref = firebase.database().ref("saved");
      
    // ref.orderByChild("currentuser").equalTo(this.props.user.displayName).on("value", snapshot => {
    //   let saved = snapshot.val()
    //   console.log(saved);
    //   let saveState = [];
    //   for (let saveId in saved) {
    //     saveState.push({
    //       id: saveId,
    //       title: saved[saveId].title,
    //       user: saved[saveId].user
    //   });
    // };

      var saved = firebase.database().ref().child('saved');
      var items = firebase.database().ref().child('items')

      saved.on('child_added', snapshot => {
        console.log(snapshot.val());
        items.child(snapshot.val().currentuser).once('value', item => {
          console.log(item.val());
        })
      })
      console.log(saved);
      //saveState.push(snapshot.child('store').child('id').val());


      // this.setState({
      //   id: '',
      //   instrument: '',
      //   expertise: '',
      //   experience:'',
      //   username: ''
      // });

    // saved.on('child_added', snapshot => {
    //   var saved = snapshot.val();
    //   console.log(this);
      //  items.child('stored').child(userId.once('user'), function (mediaSnap) {
      //    console.log(items);
      //  });
    // });


  }


  render() {
    console.log(this.state.saved);
    const saved = this.state.saved;
    if (!saved) {
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
                        <h3>{saved.user}</h3>
                      </Row>
                      <Row>
                        <h3>{saved.title}</h3>
                      </Row>
                      <Row>
                        <button onClick={this.handleDelete}>Delete</button>
                      </Row>
                   </div>
                  {/* <form onSubmit={this.handleSubmit}>
                    <input type="text" name="username" placeholder="What's your name?" onChange={this.handleChange} value={this.state.username} />
                    <input type="text" name="currentItem" placeholder="What are you bringing ?" onChange={this.handleChange} value={this.state.currentItem} />
                    <button>Add Item</button>
                  </form>  */}
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
