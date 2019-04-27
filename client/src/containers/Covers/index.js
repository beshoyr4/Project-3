import React, { Component } from "react";
import API from "../../utils/API";
import Songlist from './songlist';
import Lyrics from "./lyrics";

import "./Covers.css";

class Covers extends Component {
  state = {
    songList: [],
    lyrics: [],
    search: ""
  };

  // searches the lyrics API storing the data in lyrics array
  // searchLyrics = query => {
  //   API.searchLyrics(query)
  //     .then(res =>
  //       this.setState({
  //           lyrics: res.results.itemlist.image,
  //           search: ""
  //         },
  //         console.log(res.results.itemslist.image)
  //       )
  //     )
  //     .catch(err => console.log(err));
  // };

  handleSongClick = (event) => {
    const { sid } = event.currentTarget.dataset;
    API.searchLyrics(sid, (lyrics) => {
      this.setState({ lyrics });
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
    const { songList, lyrics } = this.state;

    console.log(songList);
    console.log(lyrics)
    console.log(lyrics.length);

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1>Cover Band</h1>
          </div>
        </div>
        {this.state.lyrics.length ? (
          <Lyrics lyrics={lyrics} onClickBack={this.handleClickBack}/>
        ) : (
          <Songlist songList={songList} onClickSong={this.handleSongClick} /> 
        )}
      </div>
    );
  }
}

export default Covers;