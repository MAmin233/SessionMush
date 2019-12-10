const configs = require("../config");
const generateRandomString = require("../helpers/generateRandomString");

module.exports.getSessionOld = function getSessionOld(session) {
  // all data is in miliseconds
  const now = Date.now();
  const old = now - session.creation_date;
  const idle_old = now - session.last_update_date;

  return { old, idle_old };
};

module.exports.isExpired = function isExpired(session) {
  const { old } = getSessionOld(session);
  if( old >= configs.session_time_to_live )
    return true;
  return false;
};

module.exports.genid = function genid() {
  return generateRandomString(configs.session_id_length);
};

module.exports.copySessionObjectToSessionDB(session_object, session_on_db) {
  
  return session_on_db;
}
