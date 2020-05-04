const http = require("http");
const https = require("https");
const url = require("url");
const fs = require("fs");
const path = require("path");
const endpoints = require("../auth/endpoints");
let reduceMsg = require("./reduceMsg");
let moreReducedMsg = require("./moreReducedMsg");
const { spawn } = require("child_process");

module.exports = (
  messageList,
  accessToken,
  totalMsg,
  origRes,
  myMessageList
) => {
  messageList.messages.forEach(({ id }) => {
    let messageObj;
    let query = {
      access_token: accessToken,
    };
    let queryString = new URLSearchParams(query).toString();
    let connection = https.request(
      `${endpoints.gmail_messages}/${id}?${queryString}`,
      (gmailRes) => {
        let sb = "";
        gmailRes.on("data", (chunk) => {
          sb += chunk.toString();
        });
        gmailRes.on("end", () => {
          messageObj = JSON.parse(sb);
          myMessageList.push(reduceMsg(messageObj));
          if (myMessageList.length === totalMsg) {
            origRes.writeHead(302, { Location: "/api/assessMessages" });
            origRes.end();
          }
        });
      }
    );
    connection.end();
  });
};
