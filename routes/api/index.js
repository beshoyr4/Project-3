const router = require("express").Router();
const lyricRoutes = require("./lyrics");

// Book routes
router.use("/lyrics", lyricRoutes);

module.exports = router;