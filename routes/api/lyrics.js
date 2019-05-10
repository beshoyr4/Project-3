const router = require("express").Router();

const lyricController = require("../../controllers/lyricsController");


// same as "/api/lyrics"
router.route("/:id")
  .get(lyricController.findById)
  .delete(lyricController.remove)

router.route("/")
  .post(lyricController.create)

module.exports = router;