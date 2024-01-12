const express = require('express');
const router = express.Router();

/* GET - show events listing page */
router.get("/list", (req, res, next) => {
  res.render("index");
});

/* GET - show event details page */
router.get("/:id", (req, res, next) => {
    res.render("index");
});

/* GET - show event create page */
router.get("/create", (req, res, next) => {
    res.render("index");
});

/* POST - event create - handling the data from event create form*/
router.post("/create", (req, res, next) => {
    res.render("index");
});


/* GET - show user profile edit page */
router.get("/:id/edit", (req, res, next) => {
    res.render("index");
});

/* POST - event edit - handling the data from event edit form*/
router.post("/:id/edit", (req, res, next) => {
    res.render("index");
});


/* POST - event delete - handling the data for event deletion*/
router.post("/:id/delete", (req, res, next) => {
    res.render("index");
});


module.exports = router;