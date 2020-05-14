const express = require("express");

let setupRoutes = require("./routes");

let app = express();
setupRoutes(app);

let PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
