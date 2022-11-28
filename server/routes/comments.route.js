const { Router } = require("express");
const router = Router();
const {commentController} = require("../controllers/comments.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/", authMiddleware, commentController.addComment);

module.exports = router;
