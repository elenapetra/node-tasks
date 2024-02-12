let users = require("./users.js").users;

function createUser(req, res) {
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
      res.statusCode = 201;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(newUser));
    });
}

function deleteUser(res, userId) {
  const userIndex = users.findIndex((user) => user.id === parseInt(userId, 10));
  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    res.statusCode = 204;
    res.end();
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: "User not found" }));
  }
}

function updateUser(req, res, userId) {
  let userIndex = users.findIndex((user) => user.id === parseInt(userId, 10));

  if (userIndex !== -1) {
    const body = [];
    req
      .on("data", (data) => {
        body.push(data);
      })
      .on("end", () => {
        const userData = JSON.parse(Buffer.concat(body).toString());
        users[userIndex] = { ...users[userIndex], ...userData };
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(users[userIndex]));
      });
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: "User not found" }));
  }
}

function getUserById(res, userId) {
  const user = users.find((user) => user.id === parseInt(userId, 10));
  if (user) {
    user.links = {
      hobbies: `/users/${user.id}/hobbies`,
    };
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({
        id: user.id,
        name: user.name,
        email: user.email,
        links: user.links,
      })
    );
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: "User not found" }));
  }
}

function getUsers(res) {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(
    JSON.stringify(
      users.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
      }))
    )
  );
}

function addHobby(req, res, userId) {
  const user = users.find((user) => user.id === parseInt(userId, 10));
  if (user) {
    let body = [];
    req
      .on("data", (data) => {
        body.push(data);
      })
      .on("end", () => {
        body = JSON.parse(Buffer.concat(body).toString());
        user.hobbies.push(...body);
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(user.hobbies));
      });
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: "User not found" }));
  }
}

function deleteHobby(resp, userId, hobbyName) {
  const user = users.find((user) => user.id === parseInt(userId, 10));
  if (user) {
    if (hobbyName) {
      const hobbyNameParam = new URLSearchParams(hobbyName).get("hobbyName");
      const lowercasedHobbyName = hobbyNameParam
        ? hobbyNameParam.toLowerCase()
        : null;
      const hobbyIndex = user.hobbies.findIndex(
        (hobby) => hobby.toLowerCase() === lowercasedHobbyName
      );
      if (hobbyIndex !== -1) {
        user.hobbies.splice(hobbyIndex, 1);
        resp.statusCode = 200;
        resp.setHeader("Content-Type", "application/json");
        resp.end(JSON.stringify(user.hobbies));
      } else {
        resp.statusCode = 404;
        resp.end("Hobby not found");
      }
    } else {
      resp.statusCode = 400;
      resp.end("Missing hobby name in query parameters");
    }
  } else {
    resp.statusCode = 404;
    resp.end("User not found");
  }
}

function getUserHobbies(res, userId) {
  const user = users.find((user) => user.id === parseInt(userId, 10));
  if (user) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Cache-Control", "max-age=31536000");
    res.end(JSON.stringify(user.hobbies));
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: "User not found" }));
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
