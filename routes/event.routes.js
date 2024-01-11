const express = require('express');
const router = express.Router();

/* GET - show events listing page */
router.get("/event/list", (req, res, next) => {
  res.render("index");
});

/* GET - show event details page */
router.get("/event/:id", (req, res, next) => {
    res.render("index");
});

/* GET - show event create page */
router.get("/event/create", (req, res, next) => {
    res.render("index");
});

/* POST - event create - handling the data from event create form*/
router.post("/event/create", (req, res, next) => {
    res.render("index");
});


/* GET - show user profile edit page */
router.get("/event/:id/edit", (req, res, next) => {
    res.render("index");
});

/* POST - event edit - handling the data from event edit form*/
router.post("/event/:id/edit", (req, res, next) => {
    res.render("index");
});


/* POST - event delete - handling the data for event deletion*/
router.post("/event/:id/delete", (req, res, next) => {
    res.render("index");
});


module.exports = router;