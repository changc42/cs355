/*
this function makes a get request to the spotify api for albums

if cache exists, and is valid, proceed with request.
if cache does not exits OR cache exists but is expired, requestToken and then search

once receive response from search, call downloadImages function
*/

const https = require("https");
const querystring = require("querystring");
const requestToken = require("./requestToken.js");
const fs = require("fs");
const downloadImages = require("./downloadImages");

let authCacheDir = "./auth/authentication-res.json";
function create_search_req(query, origRes, spotify_auth) {
  let isCacheValid = false;
  let cachedAuth;

  if (spotify_auth) {
    isCacheValid = true;
    cachedAuth = spotify_auth;
  } else {
    if (fs.existsSync(authCacheDir)) {
      cachedAuth = require(authCacheDir);

      if (Date.now() > cachedAuth.expiration) console.log("Token Expired");
      else isCacheValid = true;
    }
  }

  if (isCacheValid) {
    const pre_endpoint = "https://api.spotify.com/v1/search?";
    let params = {
      access_token: cachedAuth.access_token,
      q: query,
      type: "album",
    };
    let endpoint = pre_endpoint + querystring.stringify(params);
    let albumReq = https.request(endpoint, (resStream) => {
      let body = "";
      resStream.on("data", (chunk) => {
        body += chunk;
      });
      resStream.on("end", () => {
        let resBody = JSON.parse(body);
        downloadImages(resBody, origRes);
      });
    });
    albumReq.end();
  } else {
    requestToken(query, origRes);
  }
}
module.exports = create_search_req;
