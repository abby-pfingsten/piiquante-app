const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

const sauceControl = require("../controllers/sauce");

// router.post("/signup", userCtrl.signup);
// router.post("/login", userCtrl.login);

module.exports = router;
