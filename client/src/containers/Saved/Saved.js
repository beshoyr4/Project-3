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

    componentWillMount() {
        API.getUsers().then(
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
