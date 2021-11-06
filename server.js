// "http" is a node.js module. Don't have to install it.
// Others like "nodemon" are third party modules, so you need to install it
const http = require("http");

const players = [
  { id: 0, name: "Mustafa" },
  { id: 1, name: "Basem" },
  { id: 2, name: "Mekkawy" },
];

const server = http.createServer(function (req, res) {
  const { headers, url, method } = req;
  console.log(headers, url, method);

  // You usually need to state the content type (e.g. html for browsers to know how to render it)
  // res.setHeader("Content_Type", "text/plain");
  // res.setHeader("Content_Type", "text/html");
  res.setHeader("Content_Type", "application/json");

  // request body
  // res.write("test");
  // res.write("<h1>test</h1>");
  // res.write("<h1>test</h1>");

  // status code (success)
  res.statusCode = 200;
  //   res.statusCode = 404;

  // This is considered a successful res if no errors occured (200 ok)
  // res.end();
  // When returning one thing as body, you can ignore ".write()" pass it to ".end()"
  res.end(
    JSON.stringify({
      success: true,
      data: players,
    })
  );
  // Example for 404
  // res.end(
  //   JSON.stringify({
  //     success: false,
  //     error: 'Not found',
  //     data: null,
  //   })
  // );
});

const PORT = 5000;

// Run server
server.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
