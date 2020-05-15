const { v4: uuidv4 } = require("uuid");

module.exports = (app) => {
  app.use((req, res, next) => {
    if (!req.headers.cookie) {
      console.log("no existing cookie. give new cookie");
      res.writeHead(302, {
        "set-cookie": `emailrater=${uuidv4()}`,
        location: req.url,
      });
      res.end();
    } else {
      console.log("already have cookie");
      next();
    }
  });
};
