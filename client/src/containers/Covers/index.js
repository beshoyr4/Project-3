import React, { Component } from "react";
import musicLoader from "./assets/music-loader.gif";
import API from "../../utils/API";
import Songlist from "./songlist";
import Lyrics from "./lyrics";

import "./covers.css";

class Covers extends Component {
  state = {
    songList: [],
    lyrics: [],
    search: "",
    loading: true,
    saving: false
  };

  handleSongClick = event => {
    this.setState({ loading: true });
    const { sid } = event.currentTarget.dataset;

    API.searchLyrics(sid, (lyrics) => {
      this.setState({
        lyrics,
        selectedSongId: sid,
        loading: false
      });
    });
  };

  handleClickBack = () => {
    if (this.state.saving) { return }
    this.setState({ lyrics: [], selectedSongId: null });
  };

  saveLyrics = () => {
    if (this.state.saving) { return }

    this.setState({ saving: true })
    const song = this.state.songList.find((song) => song.songid === this.state.selectedSongId)

    const lyricData = {
      artist: song.artistname,
      title: song.songname,
      album: song.albumname,
      lyric: this.state.lyrics,
      user_id: this.props.user.uid
    }
    API.saveLyrics(lyricData)
    .then( result => {
      if (result.status === 200 && result.data.status === 'ok' ) {
        this.setState(
          { saving: false },
          this.handleClickBack
        )
      }
    })
  }

  componentDidMount() {
    API.searchSongs(songList => {
      this.setState({ songList, loading: false });
    });
  }

  render() {
    
    const { songList, lyrics, loading } = this.state;

    return (
      <div className="container" id="covers-container">
        <div>
          <h2 id="start-cover">Start a Cover Band</h2>
        </div>
        <div>
          {this.state.lyrics.length ? (
            <Lyrics lyrics={lyrics} 
            onClickBack={this.handleClickBack} 
            saveLyrics={this.saveLyrics}
            saving={this.state.saving} 
            />
          ) : (
            <div>
              <Songlist songList={songList} onClickSong={this.handleSongClick} />
              { loading && <img src={musicLoader} alt="Loading" /> }
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Covers;
