import axios from "axios";

import unirest from 'unirest';
const BASEURL = "https://ptwebsolution-song-and-lyric-database-in-the-world-v1.p.rapidapi.com/music/searchartist";

export default {
  searchSongs: function (cb) {
    unirest.post("https://ptwebsolution-song-and-lyric-database-in-the-world-v1.p.rapidapi.com/music/gettopchart")
      .header("X-RapidAPI-Host", "ptwebsolution-song-and-lyric-database-in-the-world-v1.p.rapidapi.com")
      .header("X-RapidAPI-Key", "Hnlun7SCs5mshYE2zwqPYriwGyafp1oKwnyjsnoYxHbzRxk51A")
      .header("Content-Type", "application/x-www-form-urlencoded")
      .end(function (result) {
         cb(result.body.results.songlist);
      });
  },
  searchLyrics: function (id, cb) {
    unirest.post("https://ptwebsolution-song-and-lyric-database-in-the-world-v1.p.rapidapi.com/music/getlyric")
      .header("X-RapidAPI-Host", "ptwebsolution-song-and-lyric-database-in-the-world-v1.p.rapidapi.com")
      .header("X-RapidAPI-Key", "Hnlun7SCs5mshYE2zwqPYriwGyafp1oKwnyjsnoYxHbzRxk51A")
      .header("Content-Type", "application/x-www-form-urlencoded")
      .send("id=" + id)
      .end(function (result) {
        const payload = result.body.results
          .filter((line) => (line.timing && line.text))
          .map((line) => line.text);

         cb(payload);
      });
  },
  getLyrics: function (id) {
    return axios.get("/api/lyrics/" + id);
  },
  saveLyrics: function (lyricData) {
    return axios.post("/api/lyrics", lyricData);
  },
  deleteLyrics: function (id) {
    return axios.delete("api/lyrics/" + id)
  }
};