const http = require("http");
const https = require("https");
const url = require("url");
const fs = require("fs");
const path = require("path");
const endpoints = require("./auth/endpoints");
const { client_id, client_secret, state } = require("./auth/keys");
const scopes = require("./auth/scopes");
let addMessage = require("./utilFunctions/addMessage");
const { spawn } = require("child_process");

module.exports = (str) => {
  let dataToSend = "";
  const python = spawn("python", ["script1.py", str]);
  python.stdout.on("data", (data) => {
    dataToSend += data.toString();
  });
  python.on("close", (code) => {
    console.log(dataToSend);
  });
};

/*
change html content of reduced message to filtered text-only-string, update the reduced msg, add the reduced message to myMessageList
*/
function addFilteredMsg(myMessageList, totalMsg, origRes, reducedMsg) {
  let { content } = reducedMsg;
  let filteredMsg = "";
  const python = spawn("python", ["./utilFunctions/script1.py", content]);
  python.stdout.on("data", (data) => {
    filteredMsg += data.toString();
  });
  python.on("close", (code) => {
    console.log(content);
    reducedMsg.content = filteredMsg;
    myMessageList.push(reducedMsg);
    if (myMessageList.length === totalMsg) {
      origRes.writeHead(302, { Location: "/api/finished" });
      origRes.end();
    }
  });
}
