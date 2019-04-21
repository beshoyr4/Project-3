import React from "react";
import ResultsContainer from "../components/ResultsContainer";
import API from "../utils/API";

class Saved extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            savedUsers: []
        }
    }

    // Firebase Join of user table items table to user saved
    //Create a saved table to firebase

    componentWillMount() {
        firebase.database().ref('items')
        getUsers().then(
            (response) => {
                this.setState({savedUsers: response.data});
            }
        ).catch(
            (err) => {
                console.log(err);
            }
        );
    }

    render() {
        console.log(this.state.savedUsers);
        return(
            <main>
                <ResultsContainer savedUsers={this.state.savedUsers} path={this.props.match.path}/>
            </main>
        );
    }
}

export default Saved;
