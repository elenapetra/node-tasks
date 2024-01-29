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

function handleUsersRoute(req, resp, method) {
  switch (method) {
    case "POST":
      createUser(req, resp);
      break;
    case "GET":
      getUsers(resp);
      break;
    default:
      resp.statusCode = 405;
      resp.end("Method not allowed");
  }
}

function handleSingleUserRoute(req, resp, method, userId) {
  switch (method) {
    case "DELETE":
      deleteUser(resp, userId);
      break;
    case "PATCH":
      updateUser(req, resp, userId);
      break;
    case "GET":
      getUserById(resp, userId);
      break;
    default:
      resp.statusCode = 405;
      resp.end("Method not allowed");
  }
}

function handleHobbiesRoute(req, resp, method, userId) {
  switch (method) {
    case "POST":
      addHobby(req, resp, userId);
      break;
    case "DELETE":
      deleteHobby(req, resp, userId);
      break;
    case "GET":
      getUserHobbies(resp, userId);
      break;
    default:
      resp.statusCode = 405;
      resp.end("Method not allowed");
  }
}

module.exports = {
  handleUsersRoute,
  handleHobbiesRoute,
  handleSingleUserRoute,
};
