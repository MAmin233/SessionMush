const mongoose = require("mongoose");

const { Mixed } = mongoose.Schema.Types;

let sessionSchema = mongoose.Schema({
  session_id: String,
  creation_date: Number,
  last_update_date: Number,
  data: Mixed
});

module.exports = mongoose.model("Session", sessionSchema);
