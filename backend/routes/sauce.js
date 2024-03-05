const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

const sauceControl = require("../controllers/sauce");

router.get("/", sauceControl.getAllSauces);



module.exports = router;
