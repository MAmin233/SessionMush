const { genid } = require("./utils")

function create() {
  const session_id = genid();
  const creation_date = Date.now();
  const data = new Object();

  return { session_id, creation_date, data };
}

module.exports = create;
