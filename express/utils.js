const { SESSION_ID_PROPERTY_KEY } = require("./constants");

const sessionMethods = require("../methods");
const sessionDB = require("../database");

module.exports.sessionExist = function(s) {
  return s ? true : false;
};

module.exports.validateSession = function(session) {
  if (!session) return false; // no session exist
  if (sessionMethods.sessionIsExpired(session)) return false;
  return true;
};

module.exports.setSessionToResponse = function(session, response) {
  response.header(SESSION_ID_PROPERTY_KEY, session.session_id);
};

module.exports.gatherSessionDataFromHeaders = function(request) {
  const session_id = request.headers[SESSION_ID_PROPERTY_KEY];
  return { session_id };
};

module.exports.addSessionToRequest = function(session_on_db, request) {
  async function update_session_on_db() {
    session_on_db.data = this.data;
    session_on_db.last_update_date = Date.now();
    var temp = await sessionDB.updateSession(session_on_db);
    return this;
  }

  var session = {
    session_id: session_on_db.session_id,
    creation_date: session_on_db.creation_date,
    last_update_date: session_on_db.last_update_date,
    data: session_on_db.data || {}, // mongoose return undefined for empty objects
    save: update_session_on_db
  };

  return request.session = session;
};

module.exports.saveSessionObjectToDatabase = async function(session_object) {
  return await sessionDB.saveSessionObject(session_object);
}

module.exports.createSessionObject = function() {
  return sessionMethods.createSession();
};
