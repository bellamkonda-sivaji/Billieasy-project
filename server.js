
const http=require("http")

const requestListener = function (req, res) {
  
  res.end('Hello, World!');
  console.log("hello")
}

const server = http.createServer(requestListener);
console.log("server is starting")
server.listen(3000);

