const { Router } = require("express");
const router = Router();
const { categoryContoller } = require("../controllers/categories.controller");

router.get("/", categoryContoller.getCategory);
// router.post("/", categoryContoller.addCategory);

module.exports = router;
