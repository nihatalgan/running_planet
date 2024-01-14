const express = require('express');
const router = express.Router();

/* GET user profile page */
router.get("/profile", (req, res, next) => {

  // const isLoggedIn = Boolean(req.session.currentUser);
  // res.render("index", { isLoggedIn });

  res.render("index", { isLoggedIn: true });
});

/* GET user profile edit page */
router.get("/profile/edit", (req, res, next) => {
    
  const isLoggedIn = Boolean(req.session.currentUser);
  res.render("index", { isLoggedIn });
});

/* POST user profile edit - handling the data from user profile edit form*/
router.post("/profile/edit", (req, res, next) => {
    res.render("index");
});

module.exports = router;