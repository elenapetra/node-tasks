const {
  createUser,
  deleteUser,
  updateUser,
  getUserById,
  getUsers,
  addHobby,
  deleteHobby,
  getUserHobbies,
} = require("./userHandler");

function handleUsersRoute(req, res, method) {
  switch (method) {
    case "POST":
      createUser(req, res);
      break;
    case "GET":
      getUsers(res);
      break;
    default:
      res.statusCode = 405;
      res.end("Method not allowed");
  }
}

function handleSingleUserRoute(req, res, method, userId) {
  switch (method) {
    case "DELETE":
      deleteUser(res, userId);
      break;
    case "PATCH":
      updateUser(req, res, userId);
      break;
    case "GET":
      getUserById(res, userId);
      break;
    default:
      res.statusCode = 405;
      res.end("Method not allowed");
  }
}

function handleHobbiesRoute(req, res, method, userId, queryString) {
  switch (method) {
    case "POST":
      addHobby(req, res, userId, queryString);
      break;
    case "DELETE":
      deleteHobby(res, userId, queryString);
      break;
    case "GET":
      getUserHobbies(res, userId);
      break;
    default:
      res.statusCode = 405;
      res.end("Method not allowed");
  }
}

module.exports = {
  handleUsersRoute,
  handleHobbiesRoute,
  handleSingleUserRoute,
};
