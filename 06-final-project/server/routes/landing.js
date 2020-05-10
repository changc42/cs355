const fs = require("fs");

module.exports = (req, res, db) => {
  db.accessToken = null;
  db.myMessageList = [];

  res.writeHead(200, { "Content-Type": "text/html" });
  let htmlFile = fs.createReadStream("./html/landing.html");
  htmlFile.pipe(res);
};
