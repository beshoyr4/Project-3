import React from "react";
import "../Covers";

const Lyrics = ({ lyrics, onClickBack, saveLyrics, saving }) => {
  if (!lyrics) {
    return "";
  }

  return (
    <div className="row">
      <div className="col-md-12">
        <button className="goback" disabled={saving} onClick={onClickBack}>
          Go Back!
        </button>
        <br />
        <br />
        <button className="goback" disabled={saving} onClick={saveLyrics}>
          Save
        </button>

        {lyrics.map((lyric, index) => {
          return <p key={`${lyric}-${index}`}>{lyric}</p>;
        })}
      </div>
    </div>
  );
};

export default Lyrics;
