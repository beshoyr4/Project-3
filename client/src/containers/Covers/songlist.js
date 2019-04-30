import React  from "react";
import "./covers.css";

const Songlist = ({ songList, onClickSong }) => {
    return (
        <div className="row">
          <div className="col-md-12">
            <ul>
              {
                !!songList.length && songList.map((song) => {
                  return (
                    <li key={song.songid} data-sid={song.songid} onClick={onClickSong}>
                      {song.artistname} {song.songname} {song.albumname}
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