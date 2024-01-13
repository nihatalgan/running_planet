const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Require the Event model in order to interact with the database
const Event = require("../models/Event.model");

/* GET - show event create page */
router.get("/create", (req, res, next) => {
  res.render("event/eventcreate");
});

/* POST - event create - handling the data from event create form*/
router.post("/create", (req, res, next) => {
  console.log(req.body);
  const { name, date, location, distance, description, website } = req.body;
  //   console.log("req.file", req.file);
  Event.create({
    name,
    date,
    location,
    distance,
    description,
    website,
  })
    .then((newEvent) => {
      console.log(newEvent);
      res.redirect("create");
    })
    .catch((error) =>
      console.log(`Error while creating a new event: ${error}`)
    );
});

/* GET - show events listing page */
router.get("/list", (req, res, next) => {
  Event.find()
    .then((eventsFromDB) => {
      //   console.log(eventsFromDB);
      res.render("event/eventlist.hbs", { events: eventsFromDB });
    })
    .catch((err) =>
      console.log(`Error while getting the events from the DB: ${err}`)
    );
});

// router.get('/movies', (req, res) => {
//     Movie.find()
//       .then(moviesFromDB => {
//         // console.log(moviesFromDB);
//         res.render('movie-views/movies-list.hbs', { movies: moviesFromDB });
//       })
//       .catch(err => console.log(`Error while getting the movies from the DB: ${err}`));
//   });

/* GET - show event details page */
router.get("/:id", (req, res, next) => {
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
