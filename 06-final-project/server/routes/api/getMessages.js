const https = require("https");
const endpoints = require("../../auth/endpoints");

module.exports = (req, res, myMessageList) => {
  let urlObj = url.parse(req.url, true).query;
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
        let messageList = JSON.parse(sb);
        let totalMsg = messageList.messages.length;
        createMyMessageList(
          messageList,
          accessToken,
          totalMsg,
          res,
          myMessageList.myMessageList
        );
      });
    }
  );
  connection.end();
};

function createMyMessageList(
  messageList,
  accessToken,
  totalMsg,
  origRes,
  myMessageList
) {
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
      msg += base64Decode(messageObj.payload.parts[0].parts[0].body.data);
    } else msg += base64Decode(messageObj.payload.parts[0].body.data);
  } else {
    msg += base64Decode(messageObj.payload.body.data);
  }

  return msg;
}

function base64Decode(s) {
  return Buffer.from(s, "base64").toString("ascii");
}
