const {
  handleUsersRoute,
  handleHobbiesRoute,
  handleSingleUserRoute,
} = require("./routeHandler");

function handleRequest(req, res) {
  let { method, url } = req;
  url = decodeURI(url);
  const [path, queryString] = url.split("?");
  const urlParts = path.split("/").filter((part) => part !== "");
  console.log("path:", path);
  console.log("querry string:", queryString);
  console.log("urlParts:", urlParts);

  if (urlParts[0] === "users" && urlParts.length === 1) {
    handleUsersRoute(req, res, method);
  } else if (
    urlParts[0] === "users" &&
    urlParts.length === 2 &&
    /^\d+$/.test(urlParts[1])
  ) {
    const userId = urlParts[1];
    handleSingleUserRoute(req, res, method, userId);
  } else if (
    urlParts[0] === "users" &&
    urlParts.length === 3 &&
    /^\d+$/.test(urlParts[1]) &&
    urlParts[2] === "hobbies"
  ) {
    const userIdForHobbies = urlParts[1];
    handleHobbiesRoute(req, res, method, userIdForHobbies, queryString);
  } else if (urlParts.length === 0) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("Hello, World!");
  } else {
    res.statusCode = 404;
    res.end("Not found");
  }
}

module.exports = { handleRequest };
