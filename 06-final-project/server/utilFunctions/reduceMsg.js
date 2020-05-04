let base64Decode = require("./base64Decode");

// a msg obj contains a lot of information we do not need. this function removed unnecessary properties
module.exports = (messageObj) => {
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
  return { id, labelIds, snippet, headers, content, score: null };
};

//a message obj contains many parts of a msg, all in base 64. this function returns the concantenated ascii representation of the msg obj
function messageObjToString(messageObj) {
  let msg = "";
  if (messageObj.payload.parts) {
    msg += base64Decode(messageObj.payload.parts[0].body.data);
  } else {
    msg += base64Decode(messageObj.payload.body.data);
  }

  return msg;
}
