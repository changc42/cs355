const path = require("path");
const fs = require("fs");

let landing = require("./landing");
let apiAuth = require("./api/auth");
let apiAuthredirect = require("./api/authredirect");
let apiGetAndAssessMessages = require("./api/getAndAssessMessages.js");

let db = {
  accessToken: null,
  myMessageList: [],
  myMessageListCache: [],
};

module.exports = (server) => {
  server.on("request", (req, res) => {
    if (req.url === "/") {
      landing(req, res, db);
    } else if (req.url == "/api/auth") {
      apiAuth(req, res, db);
    } else if (req.url.startsWith("/api/authredirect")) {
      apiAuthredirect(req, res, db);
    } else if (req.url.startsWith("/api/getAndAssessMessages")) {
      apiGetAndAssessMessages(req, res, db);
    } else {
      let target = path.join(__dirname, "static", req.url);
      if (fs.existsSync(target)) {
        let staticFile = fs.createReadStream(target);
        staticFile.pipe(res);
      } else {
        res.write("404");
        res.end();
      }
    }
  });
};
