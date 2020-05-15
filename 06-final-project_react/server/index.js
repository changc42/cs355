const express = require("express");

const setupCookie = require("./middleware/cookie");
let setupRoutes = require("./routes");

let app = express();

setupCookie(app);
setupRoutes(app);

let PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
