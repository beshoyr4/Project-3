import React from "react";
import "./Songs.css";

const SongDetails = ({ goBack, onDelete, song}) => {
    console.log(song);
    
    return(
        <div className="row">
            <div className="col-md-12">
            <button className="goback" onClick={goBack}>Go Back!</button>
            < br/>
            < br/>
            <button
                className="goback" 
                onClick={onDelete}
                data-itmid={song._id}
            >
                Delete
            </button>
            <div>
                <h3>{ song.artist }</h3>
                <h3>{ song.title }</h3>
                <h4>{ song.album }</h4>
                <ul>
                    {
                        song.lyric.map((line, idx) => {
                            return <li key={`${line}_${idx}`}>{ line }</li>
                        })
                    }
                </ul>
            </div>
        </div>
    </div>
    )
}

export default SongDetails;