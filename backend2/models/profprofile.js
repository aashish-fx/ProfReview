const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const profileSchema = new Schema(
  {
    image: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    domain: {
      type: String,
      required: true,
    },
    college: {
      type: String,
      required: true,
    },
    breif: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
    researchgate: {
      type: String,
      required: true,
    },
    email_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Profile = mongoose.model("Profile", profileSchema);
module.exports = Profile;
