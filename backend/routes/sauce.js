const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

const sauceControl = require("../controllers/sauce");

router.get("/", auth, sauceControl.getAllSauces);
router.get("/:id", auth, sauceControl.getOneSauce);
router.post("/", auth, multer, sauceControl.addOneSauce);
router.delete("/:id", auth, sauceControl.deleteSauce);
router.put("/:id", auth, multer, sauceControl.modifySauce);
router.post("/:id/like", auth, multer, sauceControl.setLikes);

module.exports = router;
