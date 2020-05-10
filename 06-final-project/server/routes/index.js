let landing = require("./landing");
let apiAuth = require("./api/auth");
let apiAuthredirect = require("./api/authredirect");
let query = require("./query");
let apiGetMessages = require("./api/getMessages.js");
let apiAssessMessages = require("./api/assessMessages");
let results = require("./results");

let authCode;
let accessToken = {};
let messageObj;
let myMessageList = { myMessageList: [] };

module.exports = (server) => {
  server.on("request", (req, res) => {
    if (req.url === "/") {
      landing(req, res);
    } else if (req.url == "/api/auth") {
      apiAuth(req, res);
    } else if (req.url.startsWith("/api/authredirect")) {
      authCode = apiAuthredirect(req, res, accessToken);
    } else if (req.url === "/query") {
      query(req, res);
    } else if (req.url.startsWith("/api/getMessages")) {
      apiGetMessages(req, res, myMessageList);
    } else if (req.url.startsWith("/api/assessMessages")) {
      apiAssessMessages(req, res);
    } else if (req.url === "/results") {
      results(req, res);
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
