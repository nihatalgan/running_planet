const express = require('express');
const router = express.Router();

/* GET user profile page */
router.get("/user/profile", (req, res, next) => {
  res.render("index");
});

/* GET user profile edit page */
router.get("/user/profile/edit", (req, res, next) => {
    res.render("index");
});

/* POST user profile edit - handling the data from user profile edit form*/
router.post("/user/profile/edit", (req, res, next) => {
    res.render("index");
});

module.exports = router;