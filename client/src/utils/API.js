import axios from "axios";

import unirest from 'unirest';
const BASEURL = "https://ptwebsolution-song-and-lyric-database-in-the-world-v1.p.rapidapi.com/music/searchartist";

export default {
  searchSongs: function(query) {
    unirest.post("https://ptwebsolution-song-and-lyric-database-in-the-world-v1.p.rapidapi.com/music/gettopchart")
.header("X-RapidAPI-Host", "ptwebsolution-song-and-lyric-database-in-the-world-v1.p.rapidapi.com")
.header("X-RapidAPI-Key", "Hnlun7SCs5mshYE2zwqPYriwGyafp1oKwnyjsnoYxHbzRxk51A")
.header("Content-Type", "application/x-www-form-urlencoded")
.end(function (result) {
  console.log(result.body.results.songlist);
  return result.body.results.songlist;
});
  },
  searchLyrics: function(id) {
    unirest.post("https://ptwebsolution-song-and-lyric-database-in-the-world-v1.p.rapidapi.com/music/getlyric")
.header("X-RapidAPI-Host", "ptwebsolution-song-and-lyric-database-in-the-world-v1.p.rapidapi.com")
.header("X-RapidAPI-Key", "Hnlun7SCs5mshYE2zwqPYriwGyafp1oKwnyjsnoYxHbzRxk51A")
.header("Content-Type", "application/x-www-form-urlencoded")
.send("id=" + id)
.end(function (result) {
  console.log(result.status, result.headers, result.body);
  return result.body;
});
  },
  getLyrics: function() {
    return axios.get("/api/lyrics");
  },
  saveLyrics: function(lyricData) {
    return axios.post("/api/lyrics", lyricData);
  },
  deleteLyrics: function(id) {
    return axios.delete("api/lyrics/" + id)
  }
};