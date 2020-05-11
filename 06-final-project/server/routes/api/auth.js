const { client_id, state } = require("../../auth/keys");
const scopes = require("../../auth/scopes");
const endpoints = require("../../auth/endpoints");
const fs = require("fs");

module.exports = (req, res, db) => {
  let authObj = JSON.parse(
    fs.readFileSync("./cache/accessToken.txt").toString()
  );
  console.log(authObj);
  let currentTime = Date.now();
  if (currentTime < authObj.expiration) {
    db.accessToken = authObj.accessToken;
    res.writeHead(200, { "Content-Type": "text/html" });
    let htmlFile = fs.createReadStream("./html/query.html");
    htmlFile.pipe(res);
  } else {
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
  }
};
