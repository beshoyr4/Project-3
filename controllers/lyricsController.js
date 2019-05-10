const db = require("../models");

// Defining methods for the lyricssController
module.exports = {
  findById: function(req, res) {
    db.Lyric
      .find({ user_id: req.params.id })
      .then(dbModel => {
        console.log(dbModel);
        console.log(req.params.id);
        res.json({ status: 'ok', msg: '', data: dbModel })
      })
      .catch(err => res.status(422).json({ status: 'error', msg: err.toString() }));
  },
  create: function(req, res) {
    db.Lyric
      .create(req.body)
      .then(dbModel => res.json({ status: 'ok', msg: 'saved', data: null }))
      .catch(err => res.status(422).json({ status: 'error', msg: err.toString() }));
  },
  remove: function(req, res) {
    db.Lyric
      .deleteOne({ _id: req.params.id })
      .then(dbModel => res.json({ status: 'ok', msg: 'deleted', data: null }))
      .catch(err => res.status(422).json({ status: 'error', msg: err.toString() }));
  }
};
