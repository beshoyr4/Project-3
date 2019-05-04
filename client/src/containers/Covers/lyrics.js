import React from "react";
import "../Covers";

const Lyrics = ({ lyrics, onClickBack }) => {
    if (!lyrics) {
        return '';
    }
    return (
        <div className="row">
            <div className="col-md-12">
            <button className="goback" onClick={onClickBack}>Go Back!</button>
            {lyrics.map((lyric, index) => {
                return <p key={`${lyric}-${index}`}>{lyric}</p>;
            })}
                
            </div>
        </div>
    )
}

export default Lyrics