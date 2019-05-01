import React  from "react";
import "./Covers.css";

const Songlist = ({ songList, onClickSong }) => {
    return (
        <div className="row">
          <div className="col-md-12">
            <ul>
              {
                !!songList.length && songList.map((song) => {
                  return (
                    <li key={song.songid} data-sid={song.songid} onClick={onClickSong}>
                      Artist: {song.artistname} Song: {song.songname} Album: {song.albumname}
                    </li>
                  )
                })
              }
            </ul> 
          </div>
        </div>
    )
}

export default Songlist