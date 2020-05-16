const { createProxyMiddleware } = require("http-proxy-middleware");
const url = require("url");

function filter(pathname, req) {
  let urlObj = url.parse(req.url, true).query;
  if (!urlObj.bypass) return true;
}

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:5000",
      changeOrigin: true,
      onProxyRes: (proxyRes, req, res) => {
        console.log("in api proxy");
        if (req.url == "/") console.log("in proxy2");
      },
    })
  );

  app.use(
    createProxyMiddleware(filter, {
      target: "http://localhost:5000",
      onProxyRes: (proxyRes, req, res) => {
        console.log("in non api proxy");
        console.log(proxyRes.statusCode);
        if (proxyRes.statusCode >= 300 && proxyRes.statusCode < 400) {
          console.log("code 300");
          let bypassProxyHeader = proxyRes.headers;
          bypassProxyHeader.Location =
            proxyRes.headers.location + "?bypass=true";
          res.writeHead(proxyRes.statusCode, bypassProxyHeader);
          res.end();
        } else if (proxyRes.statusCode >= 400 && proxyRes.statusCode < 500) {
          console.log("code 400");
          res.writeHead(302, {
            Location: `${req.url}?bypass=true`,
          });
          res.end();
        } else {
          console.log("neither 300 nor 400");
          res.end(
            "proxy res did not have status code between 300 and 499. something bad happened"
          );
        }
      },
      selfHandleResponse: true,
    })
  );
};
