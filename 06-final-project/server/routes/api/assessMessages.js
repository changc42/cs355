module.exports = (req, res) => {
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
};
