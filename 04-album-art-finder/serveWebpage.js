function serveWebpage(imageIDs, origRes) {
  let html = "<h1>Search Results</h1>";
  let imgTags = imageIDs.map((id) => {
    return `<img src='/album-art/${id}.jpg' alt='img id =${id}'/>`;
  });
  html += imgTags.join("");
  origRes.write(html);
  origRes.end();
}

module.exports = serveWebpage;
