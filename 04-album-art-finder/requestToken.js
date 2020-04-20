const url = require("url");
const https = require("https");
const http = require("http");
const querystring = require("querystring");
const fs = require("fs");
const credentials = require("./auth/credentials.json");
let toBase64 = require("./base64");
const requestAlbum = require("./requestAlbum");

function requestToken(query) {
  let post_data_obj = {
    grant_type: "client_credentials",
  };
  let postDataQS = querystring.stringify(post_data_obj);

  let headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: `Basic ${toBase64(credentials)}`,
    "Content-Length": postDataQS.length,
  };

  let options = {
    method: "POST",
    headers: headers,
  };

  const token_endpoint = "https://accounts.spotify.com/api/token";
  let auth_sent_time = new Date();

  let authentication_req = https.request(token_endpoint, options, function (
    authentication_res
  ) {
    received_authentication(authentication_res, auth_sent_time);
  });

  authentication_req.on("error", function (e) {
    console.error(e);
  });
  console.log("Requesting Token");
  authentication_req.end(postDataQS);

  const received_authentication = function (
    authentication_res,
    // user_input,
    auth_sent_time
    // res
  ) {
    authentication_res.setEncoding("utf8");
    let body = "";
    authentication_res.on("data", function (chunk) {
      body += chunk;
    });
    authentication_res.on("end", function () {
      let spotify_auth = JSON.parse(body);
      spotify_auth.expiration = auth_sent_time.getTime() + 3600000;
      create_access_token_cache(spotify_auth);
      // create_search_req(spotify_auth, user_input, res);
    });
  };

  function create_access_token_cache(spotify_auth) {
    fs.writeFile(
      "./auth/authentication-res.json",
      JSON.stringify(spotify_auth),
      () => {
        if (query) {
          requestAlbum(query);
        }
      }
    );
  }

  // function create_search_req(spotify_auth, user_input, res) {}
}

module.exports = requestToken;
