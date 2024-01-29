const {
  handleUsersRoute,
  handleHobbiesRoute,
  handleSingleUserRoute,
} = require("./routeHandler");

function handleRequest(req, resp) {
  let { method, url } = req;
  url = decodeURI(url);
  urlParts = url.split("/");
  const usersRegex = /^\/users\/\d+\/?$/i;
  const usersHobbiesRegex = /^\/users\/\d+\/hobbies\/?$/i;
  let userId = urlParts[2];

  switch (url) {
    case "/users":
      handleUsersRoute(req, resp, method);
      break;
    case url.match(usersRegex)?.input:
      handleSingleUserRoute(req, resp, method, userId);
      break;
    case url.match(usersHobbiesRegex)?.input:
      handleHobbiesRoute(req, resp, method, userId);
      break;
    case "/":
      resp.statusCode = 200;
      resp.setHeader("Content-Type", "text/plain");
      resp.end("Hello, World!");
      break;
    default:
      resp.statusCode = 404;
      resp.end("Not found");
  }
}

module.exports = { handleRequest };
