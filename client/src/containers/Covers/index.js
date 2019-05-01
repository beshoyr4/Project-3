import React, { Component } from "react";
import musicLoader from "./assets/music-loader.gif";
import API from "../../utils/API";
import Songlist from './songlist';
import Lyrics from "./lyrics";

import "./Covers.css";

class Covers extends Component {
  state = {
    songList: [],
    lyrics: [],
    search: "",
    loading: true
  };

  handleSongClick = (event) => {
    this.setState({ loading: true })
    const { sid } = event.currentTarget.dataset;
    API.searchLyrics(sid, (lyrics) => {
      this.setState({ lyrics })
      .then(() => {
        this.setState({ loading: true })
      });
    });
  };

  handleClickBack = () => {
    this.setState({ lyrics: [] });
  }

  componentDidMount() {
    API.searchSongs((songList) => {
      this.setState({ songList });
    })
  }

  render() {
    const { songList, lyrics, loading } = this.state;

    return (
      <div className="container" id="covers-container">
        <div className="row">
          <div className="col-md-12">
            <h1>Start a Cover Band</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
        {
          this.state.lyrics.length
          ? (
            <Lyrics lyrics={lyrics} onClickBack={this.handleClickBack}/>
          ) : (
            <div>
              <Songlist songList={songList} onClickSong={this.handleSongClick} />
              { loading && <img src={musicLoader} alt="Loading" /> }
            </div>
          )
        }
          </div>
        </div>
      </div>
    );
  }
}

export default Covers;