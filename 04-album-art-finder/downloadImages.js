/*
this function analyzes the response received from search
the response param contains many items

this function checks if the image associated with the items has already been downloaded by checking the item's id

once all images are downloaded, or confirmed to be downloaded, cal serveWebpage function
*/

const https = require("https");
const querystring = require("querystring");
const fs = require("fs");
const serveWebpage = require("./serveWebpage");

function downloadImages(body, origRes) {
  let imageIDs = body.albums.items.map((item) => item.id);
  let downloadedCount = 0;
  body.albums.items.forEach((item) => {
    let img_exists = true;
    fs.access(`./auth/${item.id}.jpg`, (err) => {
      if (err) {
        https.get(item.images[0].url, (resStream) => {
          let imgStream = fs.createWriteStream(`./album-art/${item.id}.jpg`);
          resStream.pipe(imgStream);
          imgStream.on("finish", () => {
            downloadedCount++;
            if (downloadedCount === body.albums.items.length)
              serveWebpage(imageIDs, origRes);
          });
        });
      } else {
        downloadedCount++;
        if (downloadedCount === body.albums.items.length)
          serveWebpage(imageIds, origRes);
      }
    });
  });
}

module.exports = downloadImages;
