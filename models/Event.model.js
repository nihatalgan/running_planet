const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const eventSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    date: { type: Date, default: Date.now },
    location: { address: String, city: String },

    distance: {
      type: String,
      enum: ["5k", "10k", "Half Marathon", "Full Marathon"],
    },
    discription: {
      type: String,
      required: false,
    },
    website: {
      type: String,
      required: true,
    },
    
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Event = model("Event", eventSchema);

module.exports = Event;
