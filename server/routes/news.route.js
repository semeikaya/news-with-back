const { Router } = require("express");
const router = Router();
const { newsController } = require("../controllers/news.controller");
const image = require("../middlewares/file.middleware");

router.get("/", newsController.getNews);
router.get("/:id", newsController.getNewsById);
router.get("/category/:id", newsController.getNewsByCategoryId);
router.post("/", image.single("image"), newsController.addNews);

module.exports = router;
