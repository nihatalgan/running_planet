const { Schema, model } = require("mongoose");
const { distances } = require("../utils/enums");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const eventSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    date: { type: Date, default: Date.now },
    location: { type: String },

    distance: {
      type: String,
      enum: distances.map(obj => obj.value),
    },
    description: {
      type: String,
      trim: true,
    },
    website: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      // default:
      //   "https://www.utrechtmarathon.com/media/11979/lddk-20230521-0083.jpg?anchor=center&mode=crop&width=550&height=400&rnd=133470474780000000",
    },
    organiser: { type: Schema.Types.ObjectId, ref: "User", required: true },
    review: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Event = model("Event", eventSchema);

module.exports = Event;
