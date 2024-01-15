const express = require('express');
const router = express.Router();

/* GET user profile page */
router.get("/profile", (req, res, next) => {
  res.render("index");
});

/* GET user profile edit page */
router.get("/profile/edit", (req, res, next) => {
  res.render("index");
});

/* POST user profile edit - handling the data from user profile edit form*/
router.post("/profile/edit", (req, res, next) => {
    res.render("index");
});

module.exports = router;