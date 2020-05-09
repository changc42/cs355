// auth/keys not pushed to git repo. must obtain via other measures

const http = require("http");
const https = require("https");
const url = require("url");
const fs = require("fs");
const path = require("path");
const endpoints = require("./auth/endpoints");
const { client_id, client_secret, state, API_KEY } = require("./auth/keys");
const scopes = require("./auth/scopes");
let createMyMessageList = require("./utilFunctions/createMyMessageList");
const { spawn } = require("child_process");
let moreReducedMsg = require("./utilFunctions/moreReducedMsg");

let server = http.createServer();

let authCode;
let accessToken;
let messageList;
let messageObj;
let myMessageList = [];

server.on("request", (req, res) => {
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    let htmlFile = fs.createReadStream("./html/landing.html");
    htmlFile.pipe(res);
  } else if (req.url == "/api/auth") {
    let query = {
      client_id: client_id,
      redirect_uri: "http://localhost:3000/api/authredirect",
      response_type: "code",
      scope: scopes.read,
      state: state,
    };

    let queryString = new URLSearchParams(query).toString();
    res.writeHead(302, { Location: `${endpoints.oauth}?${queryString}` });
    res.end();
  } else if (req.url.startsWith("/api/authredirect")) {
    authCode = url.parse(req.url, true).query.code;
    let query = {
      client_id: client_id,
      client_secret: client_secret,
      code: authCode,
      grant_type: "authorization_code",
      redirect_uri: "http://localhost:3000/api/authredirect",
    };
    let queryString = new URLSearchParams(query).toString();
    const options = {
      method: "POST",
      hostname: "oauth2.googleapis.com",
      path: "/token",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Content-Length": Buffer.byteLength(queryString),
      },
    };
    let client = https.request(options, (tokenRes) => {
      tokenRes.on("data", (chunk) => {
        accessToken = JSON.parse(chunk.toString()).access_token;
        client.end();
        res.writeHead(302, { Location: "/query" });
        res.end();
      });
    });
    client.write(queryString);
  } else if (req.url === "/query") {
    res.writeHead(200, { "Content-Type": "text/html" });
    let htmlFile = fs.createReadStream("./html/query.html");
    htmlFile.pipe(res);
  } else if (req.url.startsWith("/api/messagelist")) {
    urlObj = url.parse(req.url, true).query;
    urlObj.access_token = accessToken;
    urlObj.maxResults = 7;
    console.log(accessToken);
    let queryString = new URLSearchParams(urlObj).toString();
    let connection = https.request(
      `${endpoints.gmail_messages}?${queryString}`,
      (gmailRes) => {
        let sb = "";
        gmailRes.on("data", (chunk) => {
          console.log("chunk received");
          sb += chunk.toString();
        });
        gmailRes.on("end", () => {
          messageList = JSON.parse(sb);
          totalMsg = messageList.messages.length;
          createMyMessageList(
            messageList,
            accessToken,
            totalMsg,
            res,
            myMessageList
          );
        });
      }
    );
    connection.end();
  } else if (req.url.startsWith("/api/assessMessages")) {
    let count = 0;
    myMessageList.forEach((msg) => {
      let query = {
        key: API_KEY,
      };
      let queryString = new URLSearchParams(query).toString();
      let options = {
        hostname: "language.googleapis.com",
        path: `/v1beta2/documents:analyzeSentiment?${queryString}`,
        method: "POST",
      };
      let nlpRes = "";
      let connection = https.request(options, (nlpResStream) => {
        nlpResStream.on("data", (chunk) => {
          nlpRes += chunk.toString();
        });
        nlpResStream.on("end", () => {
          msg.sentAnalysis = JSON.parse(nlpRes);
          count++;
          console.log(`${count}/${myMessageList.length}`);
          if (count === myMessageList.length) {
            myMessageList.forEach((e) => {
              console.log(moreReducedMsg(e));
            });
            res.writeHead(302, { Location: "/results" });
            res.end();
          }
        });
      });
      let myObj = {
        document: {
          type: "PLAIN_TEXT",
          content: `${msg.content}`,
        },
      };
      connection.write(JSON.stringify(myObj));
      connection.end();
    });
  } else if (req.url === "/results") {
    let sum = 0;
    myMessageList.forEach((e) => {
      sum += e.sentAnalysis.documentSentiment.score;
    });
    let avg = sum / myMessageList.length;
    let body = myMessageList.map((e) => {
      return `<br><div><p>From: ${
        e.headers.filter((e) => e.name === "From")[0].value
      }</p><p>To: ${
        e.headers.filter((e) => e.name === "To")[0].value
      }</p><p>Date: ${
        e.headers.filter((e) => e.name === "Date")[0].value
      }</p><p>Subject: ${
        e.headers.filter((e) => e.name === "Subject")[0].value
      }</p><p>sentiment score: ${
        e.sentAnalysis.documentSentiment.score
      }</p><p>Content: ${e.content}</p></div><br>`;
    });
    body = body.join("");
    body = `<div><h1>average score: ${avg}</h1><div>` + body;
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(body);
    res.end();
  } else {
    let target = path.join(__dirname, "static", req.url);
    if (fs.existsSync(target)) {
      let staticFile = fs.createReadStream(target);
      staticFile.pipe(res);
    } else {
      res.write("404");
      res.end();
    }
  }
});
server.listen(3000, () => {
  console.log("Listening on port 3000");
});
