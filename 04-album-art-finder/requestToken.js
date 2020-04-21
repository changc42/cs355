/*
this function takes in zero or one parameters.

In both cases, this function sends a request containg client credentials to the spotify API and 
receives an authorization token. this token is then cached in './auth/authentication-res.json'

if a parameter is given, a search will be made using the param and the search function
if no parameter is given, nothing else is done
*/

const url = require("url");
const https = require("https");
const http = require("http");
const querystring = require("querystring");
const fs = require("fs");
const credentials = require("./auth/credentials.json");
let toBase64 = require("./base64");
const create_search_req = require("./create_search_req");
const test = require("./test");

function requestToken(query, origRes) {
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
    received_authentication(authentication_res, auth_sent_time, query, origRes);
  });

  authentication_req.on("error", function (e) {
    console.error(e);
  });
  console.log("Requesting Token");
  authentication_req.end(postDataQS);

  const received_authentication = function (
    authentication_res,
    auth_sent_time,
    query,
    origRes
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
      const create_search_req = require("./create_search_req");
      create_search_req(query, origRes, spotify_auth);
    });
  };

  function create_access_token_cache(spotify_auth) {
    fs.writeFile(
      "./auth/authentication-res.json",
      JSON.stringify(spotify_auth),
      () => {
        console.log("auth cached");
      }
    );
  }
}

module.exports = requestToken;
