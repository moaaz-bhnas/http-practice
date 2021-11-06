// "http" is a node.js module. Don't have to install it.
// Others like "nodemon" are third party modules, so you need to install it
const http = require("http");

const players = [
  { id: 0, name: "Mustafa" },
  { id: 1, name: "Basem" },
  { id: 2, name: "Mekkawy" },
];

const server = http.createServer(function (req, res) {
  // Sending data in the body
  let body = [];

  req
    .on("data", function (chunk) {
      body.push(chunk);
    })
    .on("end", function () {
      body = Buffer.concat(body).toString();
      console.log("body: ", body);
    });

  /* chunk:
   A chunk is a fragment of the data that is sent by the client to server all chunks concepts to each other to make a buffer of the stream then the buffer is converted into meaning full data.
  */

  /* Buffer:
  Node.js servers have to deal with TCP streams.
  The Buffer class in Node.js provides a way of handling streams of binary data.
  */

  res.writeHead(200, {
    Content_Type: "application/json",
  });

  res.end(
    JSON.stringify({
      success: true,
      data: players,
    })
  );
});

const PORT = 5000;

// Run server
server.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
