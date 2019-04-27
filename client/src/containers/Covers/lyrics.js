import React from "react";
import "../Covers";

const Lyrics = ({ lyrics, onClickBack }) => {
    if (!lyrics) {
        return '';
    }
    console.log(lyrics);
    return (
        <div className="row">
            <div className="col-md-12">
            <div onClick={onClickBack}>Go Back!</div>
            {lyrics.map((lyric, index) => {
                return <p key={`${lyric}-${index}`}>{lyric}</p>;
            })}
                
            </div>
        </div>
    )
}

export default Lyrics