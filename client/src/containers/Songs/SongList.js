import React from "react";
import "./Songs.css";

const SongList = ({ songs, onClick }) => {
    return(
        <div className="col-md-12">
            {
                !!songs.length &&
                    <ul>
                        {
                            songs.map(song => {
                                return (
                                    <li key={song._id} onClick={onClick} data-itmid={song._id}>
                                        { song.title }
                                    </li>
                                )  
                            })
                        }
                    </ul>
            }
        </div>
    )
}

export default SongList;