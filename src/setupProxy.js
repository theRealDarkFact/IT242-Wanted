const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/wanted*",
    createProxyMiddleware({
      target: "https://api.fbi.gov",
      secure: false,
      headers: {
        host: "api.fbi.gov",
      },
      cookieDomainRewrite: "",
    })
  );
};
