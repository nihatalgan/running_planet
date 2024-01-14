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
      //   res.render("event/eventlist", { event: newEvent });
      res.redirect("/event/list");
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

/* GET - show Event profile edit page */
// router.get("/:id/edit", (req, res, next) => {
//   const { id } = req.params;

//   Event.findById(id)
//     .then((eventToEdit) => res.render("event/eventedit", eventToEdit))
//     .catch((error) =>
//       console.log(`Error while getting a single movie for edit: ${error}`)
//     );
// });

/* POST - event edit - handling the data from event edit form*/
router.post("/:id/edit", (req, res, next) => {
  const { id } = req.params;

  Event.findById(id)
    .then((eventToEdit) => res.render("event/eventedit", eventToEdit))
    .catch((error) =>
      console.log(`Error while getting a single movie for edit: ${error}`)
    );
});

/* POST - event delete - handling the data for event deletion*/
router.post("/:id/delete", (req, res, next) => {
  const { id } = req.params;
  Event.findByIdAndDelete(id)
    .then(() => res.redirect("/event/list"))
    .catch((err) => console.log(err));
});

/* GET - show event details page */
router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  Event.findById(id)
    .then((event) => {
      console.log(event);
      res.render("event/eventdetails", { event });
    })
    .catch((error) =>
      console.log(`Error while getting a single event ${error}`)
    );
});

module.exports = router;
