const router = require("express").Router();
const lyricsController = require("../../controllers/lyricsController");

// same as "/api/lyrics"
router.route("/")
  .get(lyricsController.findAll)
  .post(lyricsController.create);

// same as "/api/lyrics/:id"
router
  .route("/:id")
  .delete(lyricsController.remove);

module.exports = router;