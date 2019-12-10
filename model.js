const mongoose = require("mongoose");

let sessionSchema = mongoose.Schema({
  session_id: String,
  creation_date: Number,
  last_update_date: Number,
  data: Object
});

module.exports = mongoose.model("Session", sessionSchema);
