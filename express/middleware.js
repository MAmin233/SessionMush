const {
  gatherSessionDataFromHeaders,
  setSessionToResponse,
  addSessionToRequest,
  sessionExist,
  createSessionObject,
  saveSessionObjectToDatabase,
  validateSession
} = require("./utils");

const sessionDB = require("../database");

async function middleware(request, response, next) {
  // gather data from headers
  const { session_id } = gatherSessionDataFromHeaders(request);

  // load session from database
  var session_on_db = await sessionDB.findSessionById(session_id);

  const valid_session = await validateSession(session_on_db);

  if (valid_session) {
    addSessionToRequest(session_on_db, request);
  }

  if (!valid_session) {
    var session_object = createSessionObject();
    var session_on_db = await saveSessionObjectToDatabase(session_object)
    setSessionToResponse(session_on_db, response);
    addSessionToRequest(session_on_db, request);
  }

  next();
}

module.exports = middleware;
