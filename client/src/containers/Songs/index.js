import React, { Component } from "react";

import API from "../../utils/API";
import SongList from "./SongList";
import SongDetails from "./SongDetails";
import "./Songs.css";

class Songs extends Component {
    state = {
        songs: [],
        selectedSong: null
    };

    componentDidMount() {
        this.loadSongs();
    }
    
    loadSongs = () => {
        API.getLyrics(this.props.user.uid)
        .then((result) => {
            if (result.status === 200 && result.data.status === 'ok' ) {
                this.setState({ songs: result.data.data, selectedSong: null })
            }
        })
        // .catch(err => console.log(err));
    };

    handleDeleteSong = (evt) => {
        const id = evt.currentTarget.dataset.itmid;
        API.deleteLyrics(id)
        .then((res) => {
            if (res.status === 200 && res.data.status === 'ok') {
                this.loadSongs()
            }
        })
        // .catch(err => console.log(err));
    }

    handleSelectSong = (evt) => {
        const id = evt.currentTarget.dataset.itmid;
        const selectedSong = this.state.songs.find( itm => {
            return itm._id === id
        })
        this.setState({ selectedSong });
    }

    handleGoBack = () => {
        this.setState({ selectedSong: null })
    }

    render() {
        const { selectedSong, songs} = this.state;

        return(
          <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h2 id="start-cover">My Songs</h2>
                </div>
            </div>
            <div className="row">
                {
                    selectedSong
                        ? <SongDetails song={selectedSong} goBack={this.handleGoBack} onDelete={this.handleDeleteSong} /> 
                        : <SongList songs={songs} onClick={this.handleSelectSong} />
                }
            </div>
          </div>  
        )
    }
}

export default Songs;
