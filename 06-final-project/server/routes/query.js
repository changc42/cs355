const fs = require("fs");

module.exports = (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  let htmlFile = fs.createReadStream("./html/query.html");
  htmlFile.pipe(res);
};
