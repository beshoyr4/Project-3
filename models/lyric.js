const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const lyricSchema = new Schema({
    src: String,
    title: String,
    authors: Array,
    date: String,
    description: String,
    link: String
});

const lyric = mongoose.model("lyric", lyricSchema);

module.exports = lyric;