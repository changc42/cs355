//messageList is a list of message IDs received from gmail messages endpoint
//myMessageList is a list of message IDs and its content, formatted from the response from gmail/message/id endpoint

const https = require("https");
const url = require("url");

const endpoints = require("../../auth/endpoints");
const { API_KEY } = require("../../auth/keys");

module.exports = (req, res, db) => {
  getMessageList(req, res, db);
};

function getMessageList(req, res, db) {
  let urlObj = url.parse(req.url, true).query;
  console.log(db);
  let { maxResults, from, to, after, before } = urlObj;

  let query = {
    access_token: db.accessToken,
    maxResults,
  };
  qParam = "";
  if (from != "") qParam += `from:${from} `;
  if (to != "") qParam += `to:${to} `;
  if (after != "") qParam += `after:${after} `;
  if (before != "") qParam += `before:${before} `;
  query.q = qParam;
  let queryString = new URLSearchParams(query).toString();
  console.log(query);

  console.log(db.accessToken);

  let gmailReq = https.request(
    `${endpoints.gmail_messages}?${queryString}`,
    (gmailRes) => {
      let sb = "";
      gmailRes.on("data", (chunk) => {
        console.log("chunk received");
        sb += chunk.toString();
      });
      gmailRes.on("end", () => {
        let messageList = JSON.parse(sb);
        messageListToMyMessageList(req, res, db, messageList);
      });
    }
  );
  gmailReq.end();
}

function messageListToMyMessageList(req, res, db, messageList) {
  if (messageList.messages) {
    messageList.messages.forEach(({ id }) => {
      if (!db.myMessageListCache.map((e) => e.id).includes(id)) {
        console.log(`retrieving content of id: ${id}`);
        let query = {
          access_token: db.accessToken,
        };
        let queryString = new URLSearchParams(query).toString();
        let messageIdContentReq = https.request(
          `${endpoints.gmail_messages}/${id}?${queryString}`,
          (messageIdContentRes) => {
            let sb = "";
            messageIdContentRes.on("data", (chunk) => {
              sb += chunk.toString();
            });
            messageIdContentRes.on("end", () => {
              let messageObj = JSON.parse(sb);
              db.myMessageList.push(reduceMsg(messageObj));
              if (db.myMessageList.length === messageList.messages.length) {
                assessMessages(req, res, db);
              }
            });
          }
        );
        messageIdContentReq.end();
      } else {
        console.log(`message id ${id} already in db`);
        db.myMessageList.push(db.myMessageListCache.find((e) => e.id === id));
        if (db.myMessageList.length === messageList.messages.length) {
          assessMessages(req, res, db);
        }
      }
    });
  } else {
    res.end("no messages found");
  }
}

// a msg obj contains a lot of information we do not need. this function removed unnecessary properties
function reduceMsg(messageObj) {
  let { id, labelIds, snippet, payload } = messageObj;
  let { headers } = payload;
  headers = headers.filter(
    (e) =>
      e.name === "To" ||
      e.name === "Date" ||
      e.name === "Subject" ||
      e.name === "From"
  );
  let content = messageObjToString(messageObj);
  return { id, labelIds, snippet, headers, content, sentAnalysis: null };
}

//a message obj contains many parts of a msg, all in base 64. this function returns the concantenated ascii representation of the msg obj
function messageObjToString(messageObj) {
  console.log("decoding ", messageObj.id);
  let msg = "";
  if (messageObj.payload.parts) {
    if (messageObj.payload.parts[0].parts) {
      if (messageObj.payload.parts[0].parts[0].parts) {
        msg += base64Decode(
          messageObj.payload.parts[0].parts[0].parts[0].body.data
        );
      } else
        msg += base64Decode(messageObj.payload.parts[0].parts[0].body.data);
    } else msg += base64Decode(messageObj.payload.parts[0].body.data);
  } else msg += base64Decode(messageObj.payload.body.data);

  return msg;
}

function base64Decode(s) {
  return Buffer.from(s, "base64").toString("ascii");
}

function assessMessages(req, res, db) {
  let count = 0;
  db.myMessageList.forEach((msg) => {
    let query = {
      key: API_KEY,
    };
    let queryString = new URLSearchParams(query).toString();
    let options = {
      hostname: "language.googleapis.com",
      path: `/v1beta2/documents:analyzeSentiment?${queryString}`,
      method: "POST",
    };
    let sb = "";
    let nlpReq = https.request(options, (nlpRes) => {
      nlpRes.on("data", (chunk) => {
        sb += chunk.toString();
      });
      nlpRes.on("end", () => {
        msg.sentAnalysis = JSON.parse(sb);
        count++;
        console.log(`${count}/${db.myMessageList.length}`);
        if (count === db.myMessageList.length) {
          sendResults(req, res, db);
        }
      });
    });
    let myObj = {
      document: {
        type: "PLAIN_TEXT",
        content: `${msg.content}`,
      },
    };
    nlpReq.end(JSON.stringify(myObj));
  });
}

function sendResults(req, res, db) {
  let sum = 0;
  let total = db.myMessageList.length;
  db.myMessageList.forEach((e) => {
    if (e.sentAnalysis.error) {
      total--;
    } else sum += e.sentAnalysis.documentSentiment.score;
  });
  let avg = sum / total;
  let body = db.myMessageList.map((e) => {
    let sentScore;

    if (e.sentAnalysis.error) {
      sentScore = "message not supported for analysis";
    } else sentScore = e.sentAnalysis.documentSentiment.score;

    return `<br><div><p>From: ${
      e.headers.filter((e) => e.name === "From")[0].value
    }</p><p>To: ${
      e.headers.filter((e) => e.name === "To")[0].value
    }</p><p>Date: ${
      e.headers.filter((e) => e.name === "Date")[0].value
    }</p><p>Subject: ${
      e.headers.filter((e) => e.name === "Subject")[0].value
    }</p><p>sentiment score: ${sentScore}</p><p>Content: ${
      e.content
    }</p></div><br>`;
  });
  body = body.join("");
  body = `<div><h1>average score: ${avg}</h1><div>` + body;
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(body);
}
