const users = require("./users.js").users;

function createUser(req, resp) {
  const body = [];
  req
    .on("data", (data) => {
      body.push(data);
    })
    .on("end", () => {
      const userData = JSON.parse(Buffer.concat(body).toString());
      const newUser = {
        id: users.length + 1,
        name: userData.name,
        email: userData.email,
        hobbies: userData.hobbies || [],
      };
      users.push(newUser);
      newUser.links = {
        hobbies: `/users/${newUser.id}/hobbies`,
      };
      resp.statusCode = 201;
      resp.setHeader("Content-Type", "application/json");
      resp.end(JSON.stringify(newUser));
    });
}

function deleteUser(resp, userId) {
  const userIndex = users.findIndex((user) => user.id === parseInt(userId, 10));

  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    resp.statusCode = 204;
    resp.end();
  } else {
    resp.statusCode = 404;
    resp.end("User not found");
  }
}

function updateUser(req, resp, userId) {
  const userIndex = users.findIndex((user) => user.id === parseInt(userId, 10));

  if (userIndex !== -1) {
    const body = [];
    req
      .on("data", (data) => {
        body.push(data);
      })
      .on("end", () => {
        const userData = JSON.parse(Buffer.concat(body).toString());
        users[userIndex] = { ...users[userIndex], ...userData };
        resp.statusCode = 200;
        resp.setHeader("Content-Type", "application/json");
        resp.end(JSON.stringify(users[userIndex]));
      });
  } else {
    resp.statusCode = 404;
    resp.end("User not found");
  }
}

function getUserById(resp, userId) {
  const user = users.find((user) => user.id === parseInt(userId, 10));

  if (user) {
    user.links = {
      hobbies: `/users/${user.id}/hobbies`,
    };
    resp.statusCode = 200;
    resp.setHeader("Content-Type", "application/json");
    resp.end(
      JSON.stringify({
        id: user.id,
        name: user.name,
        email: user.email,
        links: user.links,
      })
    );
  } else {
    resp.statusCode = 404;
    resp.end("User not found");
  }
}

function getUsers(resp) {
  resp.statusCode = 200;
  resp.setHeader("Content-Type", "application/json");
  resp.end(
    JSON.stringify(
      users.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
      }))
    )
  );
}

function addHobby(req, resp, userId) {
  const userIndex = users.findIndex((user) => user.id === parseInt(userId, 10));

  if (userIndex !== -1) {
    let body = [];
    req
      .on("data", (data) => {
        body.push(data);
      })
      .on("end", () => {
        body = JSON.parse(Buffer.concat(body).toString());
        users[userIndex].hobbies = users[userIndex].hobbies.concat(body);
        resp.statusCode = 200;
        resp.setHeader("Content-Type", "application/json");
        resp.end(JSON.stringify(users[userIndex].hobbies));
      });
  } else {
    resp.statusCode = 404;
    resp.end("User not found");
  }
}

function deleteHobby(req, resp, userId) {
  const userIndex = users.findIndex((user) => user.id === parseInt(userId, 10));

  if (userIndex !== -1) {
    const body = [];
    req
      .on("data", (data) => {
        body.push(data);
      })
      .on("end", () => {
        const hobbyData = JSON.parse(Buffer.concat(body).toString());
        const hobbyIndex = users[userIndex].hobbies.indexOf(hobbyData);
        if (hobbyIndex !== -1) {
          users[userIndex].hobbies.splice(hobbyIndex, 1);
          resp.statusCode = 200;
          resp.setHeader("Content-Type", "application/json");
          resp.end(JSON.stringify(users[userIndex].hobbies));
        } else {
          resp.statusCode = 404;
          resp.end("Hobby not found");
        }
      });
  } else {
    resp.statusCode = 404;
    resp.end("User not found");
  }
}

function getUserHobbies(resp, userId) {
  const user = users.find((user) => user.id === parseInt(userId, 10));

  if (user) {
    resp.statusCode = 200;
    resp.setHeader("Content-Type", "application/json");
    resp.setHeader("Cache-Control", "max-age=31536000");
    resp.end(JSON.stringify(user.hobbies));
  } else {
    resp.statusCode = 404;
    resp.end("User not found");
  }
}

module.exports = {
  createUser,
  deleteUser,
  updateUser,
  getUserById,
  getUsers,
  addHobby,
  deleteHobby,
  getUserHobbies,
};
