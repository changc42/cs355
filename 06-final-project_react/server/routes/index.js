const path = require("path");
const fs = require("fs");

let db = {
  accessToken: null,
  myMessageList: [],
  myMessageListCache: [],
};

module.exports = (app) => {
  app.get("/api/auth", (req, res) => {
    // res.redirect("/query");
    res.end("at api/auth");
  });

  // app.get("/api/authredirect", (req, res) => {
  //   apiAuthredirect(req, res, db);
  // });

  // app.get("/api/getAndAssessMessages", (req, res) => {
  //   apiGetAndAssessMessages(req, res, db);
  // });

  // app.get("/api/sendResults", (req, res) => {
  //   sendResults(req, res, db);
  // });
};
// module.exports = (server) => {
//   server.on("request", (req, res) => {
//     if (req.url === "/") {
//       landing(req, res, db);
//     } else if (req.url == "/api/auth") {
//       apiAuth(req, res, db);
//     } else if (req.url.startsWith("/api/authredirect")) {
//       apiAuthredirect(req, res, db);
//     } else if (req.url.startsWith("/api/getAndAssessMessages")) {
//       apiGetAndAssessMessages(req, res, db);
//     } else if (req.url === "/api/sendResults") {
//       sendResults(req, res, db);
//     } else if (req.url.startsWith("/subpath")) {
//       let splitUrl = req.url.split("/");
//       let splitDesiredPath = splitUrl.filter((e) => e !== "subpath");
//       let desiredPath = splitDesiredPath.join("/");
//       console.log("Test1");
//       let target = path.join(__dirname, "../client/build", desiredPath);

//       if (fs.existsSync(target)) {
//         let staticFile = fs.createReadStream(target);
//         staticFile.pipe(res);
//       } else {
//         res.end("404 not found errrrror");
//       }
//     } else {
//       let target = path.join(__dirname, "static", req.url);
//       let target2 = path.join(__dirname, "../client/build", req.url);
//       if (fs.existsSync(target)) {
//         let staticFile = fs.createReadStream(target);
//         staticFile.pipe(res);
//       } else if (fs.existsSync(target2)) {
//         let staticFile = fs.createReadStream(target2);
//         staticFile.pipe(res);
//       } else {
//         res.write("404");
//         res.end();
//       }
//     }
//   });
// };
