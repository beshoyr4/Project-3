import React, { Component } from "react";

import API from "../../utils/API";

class Songs extends Component {
    state = {
        artist: "",
        title: "",
        album: "",
        lyric: "",
        user_id: ""
    };

    componentDidMount() {
        this.loadSongs();
    }
    
    loadSongs = () => {
        API.getLyrics(this.props.user.key)
        .then(res =>
            this.setState({ songs: res })
            )
            .catch(err => console.log(err));
    };

    deleteSong = id => {
        API.deleteLyrics(id)
        .then(res => this.loadSongs())
        .catch(err => console.log(err));
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    render() {
        return(
          <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h2>My Songs</h2>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">

                </div>
            </div>
          </div>  
        )
    }
}

export default Songs;
