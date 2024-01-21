const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middleware/isLoggedIn");

const User = require("../models/User.model");

/* GET user profile page */
router.get("/profile", isLoggedIn, (req, res, next) => {
  const id = req.session.currentUser._id;
  User.findById(id)
    .populate("favorite")
    .then((profileToEdit) => {
      res.render("user/user-profile", { userDetails: profileToEdit });
    })
    .catch((error) => next(error));
});

/* GET user profile edit page */
router.get("/profile/edit", isLoggedIn, (req, res, next) => {
  const id = req.session.currentUser._id;
  User.findById(id)
    .then((profileToEdit) => {
      res.render("user/user-profile-edit", { userToEdit: profileToEdit });
    })
    .catch((error) => next(error));
});

/* POST user profile edit - handling the data from user profile edit form*/
router.post("/profile/edit", isLoggedIn, (req, res, next) => {
  const id = req.session.currentUser._id;
  const { name, surname, birthdate, gender } = req.body;
  User.findByIdAndUpdate(id, { name, surname, birthdate, gender })
    .then((updatedProfile) => res.redirect(`/user/profile`))
    .catch((error) => next(error));
});

/* POST user adds the events to favorites */
router.post("/profile/fav-event", isLoggedIn, (req, res) => {
  const userId = req.session.currentUser._id;
  const eventId = req.body.event;
  User.findByIdAndUpdate(
    userId,
    {
      $addToSet: { favorite: eventId },
    },
    { new: true }
  )
    .then(() => {
      res.redirect("/event/list");
    })
    .catch((error) =>
      console.log(`Error while creating a new favorite: ${error}`)
    );
});

router.post("/profile/no-fav-event", isLoggedIn, (req, res) => {
  const userId = req.session.currentUser._id;
  const eventId = req.body.event;
  console.log(eventId);
  User.findByIdAndUpdate(
    userId,
    {
      $pull: { favorite: eventId },
    },
    { new: true }
  )
    .then(() => {
      res.redirect(`/user/profile`);
    })
    .catch((error) =>
      console.log(`Error while creating a new favorite: ${error}`)
    );
});

module.exports = router;
