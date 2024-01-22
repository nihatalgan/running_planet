const eventModel = require("../models/Event.model");

function isEventOrganiser(req, res, next) {
    const { id } = req.params;

    eventModel.findById(id)
        .then((event) => {
            // https://www.mongodb.com/docs/manual/reference/method/ObjectId.toString/
            if (event.organiser.toString() === req.session.currentUser._id) {
                next();
            } else {
                res.redirect('/event/list')
            }
        })
        .catch((err) => {
            console.log(error);
            res.status(500)
            res.render('error', { error: err })
        })
};

module.exports = isEventOrganiser;