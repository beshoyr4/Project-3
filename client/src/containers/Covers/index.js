import React, { Component } from "react";
import API from "../../utils/API";

class Lyrics extends Component {
  state = {
    lyrics: [],
    search: ""
  };

  // searches the lyrics API storing the data in lyrics array
  searchLyrics = query => {
    API.searchLyrics(query)
      .then(res =>
        this.setState(
          {
            lyrics: res.results.itemlist.image,
            search: ""
          },
          console.log(res.results.itemslist.image)
        )
      )
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value
    });
  };

  // once the search term is submitted, search the GoogleLyrics API for the value of `this.state.search`
  handleFormSubmit = event => {
    event.preventDefault();
    this.searchLyrics(this.state.search);
  };

  // saves lyric to database
  handleSaveLyric = lyricData => {
    API.saveLyric(lyricData)
      .then(res => alert("Lyric Saved!"))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className= "col-md-12">
           <h1>Cover Band</h1>
          </div>
        </div>
        
        <div className="row">
          <div className= "col-md-12">
            {this.state.lyrics.length ? (
                        <ul>

                {this.state.lyrics.map(lyric => (
                  <li id={lyric.songid}>
                  {lyric.artistname} 
                  {lyric.songname} 
                  {lyric.albumname}
                  </li>  
            ))}  
            </ul>

            ) : (null)}
          </div>


        </div>
      </div>
    );
  }
}

export default Lyrics;