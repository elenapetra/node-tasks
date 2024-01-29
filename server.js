const http = require("http");
const { handleRequest } = require("./requestHandler");

const server = http.createServer(handleRequest);
const port = 3000;

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
