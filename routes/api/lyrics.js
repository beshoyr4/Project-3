const router = require("express").Router();

// same as "/api/lyrics"
router.route("/")
  .get((req, res) => {
    res.json({ status: 'ok' });
  })

module.exports = router;