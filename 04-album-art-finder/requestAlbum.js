const https = require("https");
const querystring = require("querystring");
const fs = require("fs");
const requestToken = require("./requestToken.js");

let authCacheDir = "./auth/authentication-res.json";

function requestAlbum(query) {
  let isCacheValid = false;
  let cachedAuth;
  if (fs.existsSync(authCacheDir)) {
    cachedAuth = require(authCacheDir);

    if (Date.now() > cachedAuth.expiration) console.log("Token Expired");
    else isCacheValid = true;
  }

  if (isCacheValid) {
    const pre_endpoint = "https://api.spotify.com/v1/search?";
    let params = {
      access_token: cachedAuth.access_token,
      q: query,
      type: "album",
    };
    let endpoint = pre_endpoint + querystring.stringify(params);
    let albumReq = https.request(endpoint, (res) => {
      console.log(res.keys());
    });
    albumReq.end();
  } else {
    requestToken(query);
  }
}

module.exports = requestAlbum;
requestAlbum("Taylor Swift");
