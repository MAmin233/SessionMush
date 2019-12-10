var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/testDB",  {useNewUrlParser: true});

const sessionMethods = require("./methods");
const sessionDB = require("./db");

const test = async function() {
  var session_object = sessionMethods.createSession();
  // console.log(session);

  var session_on_db = await sessionDB.saveNewSession(session_object);
  session_on_db.data = {viewed: true};

  var res = await session_on_db.save();


  var z = await sessionDB.findSessionById(session_on_db.session_id);

  console.log(session_on_db.data);

  var res = await session_on_db.save();

  var z = await sessionDB.findSessionById(session_on_db.session_id);

  console.log(z);

  sessionDB.deleteSession(session_on_db),

};

test();
