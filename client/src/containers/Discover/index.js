import React from "react";
import { retrieve } from "../../utils/API";

class Discover extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            savedUsers: []
        }
    }

    componentDidMount() {
        retrieve();
    }

    render() {
        console.log(this.state.savedUsers);
        return(
            <main>
                <h1>Hi</h1>
            </main>
        );
    }
}

export default Discover;


