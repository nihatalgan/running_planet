const { Schema, model } = require("mongoose");
const { genders } = require("../utils/enums");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    birthdate: {
      type: Date,
    },
    gender: {
      type: String,
      enum: genders.map(obj => obj.value),
    },
    password: {
      type: String,
      required: true,
    },
    favorite: [{ type: Schema.Types.ObjectId, ref: "Event" }],
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
