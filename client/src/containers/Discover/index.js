import React from "react";
import firebase from "../../firebase";

class Discover extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            people: [],
            active: 0
        }
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
                }
                this.setState({
                    people: newState
                })
            })
    }

    handleBtnClick = event => {
        // Load next person
        console.log("here")
        this.setState(state => {
            return {
                active: this.state.active + 1
            }
        })
        
        // Need to add something - if next one is more than there are people, reset to 0

    };


    render() {
        console.log(this.state.people)
        const person = this.state.people[this.state.active]
        if (!person) {
            return null;
        }
        return (
            <main>
                <button onClick={this.handleBtnClick}>"Click"</button>
                <ul>
                    <h3>{person.title}</h3>
                    <h3>{person.user}</h3>
                </ul>
            </main>
        );
    }
}

export default Discover;