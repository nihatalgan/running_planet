const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const isLoggedIn = require("../middleware/isLoggedIn");
// Require the Event model in order to interact with the database
const Event = require("../models/Event.model");
// ********* require fileUploader in order to use it *********
const fileUploader = require("../config/cloudinary.config");

/* GET - show event create page */
router.get("/create", isLoggedIn, (req, res, next) => {
  res.render("event/eventcreate");
});

/* POST - event create - handling the data from event create form*/
router.post(
  "/create",
  fileUploader.single("event-cover-image"),
  (req, res, next) => {
    const { name, date, location, distance, description, website } = req.body;
    const organiser = req.session.currentUser._id;
    Event.create({
      name,
      date,
      location,
      distance,
      description,
      website,
      imageUrl: req.file.path,
      organiser,
    })
      .then((newEvent) => {
        res.redirect(`/event/${newEvent.id}`);
      })
      .catch((error) =>
        console.log(`Error while creating a new event: ${error}`)
      );
  }
);

/* GET - show events listing page */
router.get("/list", (req, res, next) => {
  Event.find()
    .then((eventsFromDB) => {
      res.render("event/eventlist.hbs", { events: eventsFromDB });
    })
    .catch((err) =>
      console.log(`Error while getting the events from the DB: ${err}`)
    );
});

/* POST - event edit - handling the data from event edit form*/
router.post(
  "/:id/edit",
  fileUploader.single("event-cover-image"),
  (req, res, next) => {
    const { id } = req.params;
    const {
      name,
      date,
      location,
      distance,
      description,
      website,
      existingImage,
    } = req.body;

    let imageUrl;
    if (req.file) {
      imageUrl = req.file.path;
    } else {
      imageUrl = existingImage;
    }

    Event.findByIdAndUpdate(
      id,
      { name, date, location, distance, description, website, imageUrl },
      { new: true }
    )
      .then((eventEdited) => res.redirect(`/event/${eventEdited.id}`))
      .catch((error) =>
        console.log(`Error while getting a single event for edit: ${error}`)
      );
  }
);

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
    .populate("organiser")
    .then((event) => {
      let isOrganiser = false;
      // error occured = Cannot read properties of undefined (reading '_id'):
      // when guest user access this page
      // session will be empty
      // to check if it is organiser
      // we need to know if session data is available
      // and if currentUser is present in session
      // and we need to check currentUser id is equal to event creator id
      if (req.session.currentUser && req.session.currentUser._id) {
        if (event.organiser.id === req.session.currentUser._id) {
          isOrganiser = true;
        }
      }
      res.render("event/eventdetails", { event, isOrganiser });
    })
    .catch((error) =>
      console.log(`Error while getting a single event ${error}`)
    );
});

/* GET - show Event profile edit page */
router.get("/:id/edit", isLoggedIn, (req, res, next) => {
  const { id } = req.params;

  Event.findById(id)
    .then((eventToEdit) => res.render("event/eventedit", eventToEdit))
    .catch((error) =>
      console.log(`Error while getting a single event for edit: ${error}`)
    );
});

module.exports = router;
