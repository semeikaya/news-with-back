const { Router } = require("express");

const router = Router();

router.use("/news", require("./news.route"));
router.use("/users", require("./users.route"));
router.use("/comments", require("./comments.route"));
router.use("/categories", require("./categories.route"));

module.exports = router;
