module.exports = (req, res) => {
  let sum = 0;
  let total = myMessageList.length;
  myMessageList.forEach((e) => {
    if (e.sentAnalysis.error) {
      total--;
    } else sum += e.sentAnalysis.documentSentiment.score;
  });
  let avg = sum / total;
  let body = myMessageList.map((e) => {
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
  res.write(body);
  res.end();
};
