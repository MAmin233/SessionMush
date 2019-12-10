const SessionModel = require("./model");

exports.saveSessionObject = async function(session_object) {
  const { session_id, creation_date, data } = session_object;
  var session_on_db = SessionModel({
    session_id: session_id,
    creation_date: creation_date,
    last_update_date: creation_date,
    data: data
  });

  return await session_on_db.save();
}

// session: SessionModel object
async function deleteSession(session) {
  return await session.remove();
}

// session: SessionModel object
async function updateSession(session) {
  return await session.save();
}

// session_id: Unique identity string
async function findSessionById(session_id) {
  if (!session_id) return null;

  var session = await SessionModel.findOne({
    session_id: session_id
  });

  return session;
}

var exports = module.exports;
exports.updateSession = updateSession;
exports.deleteSession = deleteSession;
exports.findSessionById = findSessionById;
