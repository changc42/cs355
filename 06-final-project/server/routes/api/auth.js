const { client_id, state } = require("../../auth/keys");
const scopes = require("../../auth/scopes");
const endpoints = require("../../auth/endpoints");

module.exports = (req, res) => {
  let query = {
    client_id: client_id,
    redirect_uri: "http://localhost:3000/api/authredirect",
    response_type: "code",
    scope: scopes.read,
    state: state,
  };

  let queryString = new URLSearchParams(query).toString();
  res.writeHead(302, { Location: `${endpoints.oauth}?${queryString}` });
  res.end();
};
