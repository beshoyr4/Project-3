import React from "react";
import firebase from "../../firebase";

class Discover extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            people: []
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

    render() {
        console.log(this.state.people)
        return (
            <main>
                <ul>
                    {this.state.people.map((person) => {
                        return (
                            <li key={person.id}>
                                <h3>{person.title}</h3>
                                <h3>{person.user}</h3>
                            </li>
                )
                    })}
            </ul>
            </main>
                );
            }
        }
        
        export default Discover;
        
        
