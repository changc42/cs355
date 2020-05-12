const fs = require("fs");

module.exports = (req, res, db) => {
  db.myMessageList.forEach((e) => {
    if (!db.myMessageListCache.map((cacheObj) => cacheObj.id).includes(e.id))
      db.myMessageListCache.push(e);
  });
  db.myMessageList = [];

  res.writeHead(200, { "Content-Type": "text/html" });
  let htmlFile = fs.createReadStream("./html/landing.html");
  htmlFile.pipe(res);
};
