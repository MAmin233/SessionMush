const express = require("express");
const mongoose = require("mongoose");

const sessionMush = require("../");

mongoose.connect("mongodb://localhost:27017/testDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

var testApp = express();
testApp.use(sessionMush);

testApp.use(async function(req, res, next) {
  var start = Date.now();
  if (!req.session.data.view)
    req.session.data.view = 1;
  else
    req.session.data.view += 1;
  await req.session.save();
  res.send(req.session.data);
  var end = Date.now();
  console.log("completed in: ", end - start, "ms");
});

testApp.listen(8000);
