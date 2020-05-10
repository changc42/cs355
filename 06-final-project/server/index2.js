const http = require("http");
const https = require("https");
const url = require("url");
const path = require("path");
const MongoClient = require("mongodb").MongoClient;

let createMyMessageList = require("./utilFunctions/createMyMessageList");
const { spawn } = require("child_process");
let moreReducedMsg = require("./utilFunctions/moreReducedMsg");
let setupRoutes = require("./routes");

const uri =
  "mongodb+srv://admin:emailrater@cluster0-tkmid.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect((err) => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

let server = http.createServer();

setupRoutes(server);

server.listen(3000, () => {
  console.log("Listening on port 3000");
});
