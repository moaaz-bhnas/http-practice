// "http" is a node.js module. Don't have to install it.
// Others like "nodemon" are third party modules, so you need to install it
const http = require("http");

const players = [
  { id: 0, name: "Mustafa" },
  { id: 1, name: "Basem" },
  { id: 2, name: "Mekkawy" },
];

const server = http.createServer(function (req, res) {
  const { method, url } = req;

  let body = [];

  req
    .on("data", function (chunk) {
      body.push(chunk);
    })
    .on("end", function () {
      body = Buffer.concat(body).toString();

      let status = 404;
      const response = {
        success: false,
        data: null,
        error: null,
      };

      if (method === "GET" && url === "/players") {
        status = 200;
        response.success = true;
        response.data = players;
      } else if (method === "POST" && url === "/players") {
        const { name } = JSON.parse(body);

        if (!name) {
          status = 400;
          response.error = "Please add name!";
        } else {
          const lastId = players[players.length - 1].id;
          players.push({
            id: lastId + 1,
            name,
          });

          status = 201;
          response.success = true;
          response.data = players;
        }
      }

      res.writeHead(status, {
        Content_Type: "application/json",
        "X-Powered-By": "Node.js",
      });

      res.end(JSON.stringify(response));
    });
});

const PORT = 5000;

// Run server
server.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
