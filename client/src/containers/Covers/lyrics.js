import React from "react";

const Lyrics = ({ lyrics }) => {
    if (!lyrics) {
        return '';
    }
    console.log(lyrics);
    return (
        <div className="row">
            <div className="col-md-12">
            {lyrics.map((lyric, index) => {
                return <p key={`${lyric}-${index}`}>{lyric}</p>;
            })}
                
            </div>
        </div>
    )
}

export default Lyrics