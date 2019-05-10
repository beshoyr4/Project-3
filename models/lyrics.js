const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const lyricSchema = new Schema({
  artist: { type: String, required: true },
  title: { type: String, required: true },
  album: { type: String, required: true },
  lyric: { type: Array, required: true },
  user_id: { type: String, required: true }
});

const Lyric = mongoose.model("Lyric", lyricSchema);

module.exports = Lyric;
