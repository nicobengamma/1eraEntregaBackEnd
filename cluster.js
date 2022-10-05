const numCpus = require("os").cpus().length;
const cluster = require("cluster");
const http = require("http");

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);
  for (let i = 0; i < numCpus; i++) {
    cluster.fork();
  }
  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died :(), Reinician2`);
    cluster.fork();
  });
} else {
  http
    .createServer((req, res) => {
      console.log(`Entro en el proceso ${process.pid}`);
      res.writeHead(200);
      res.end("hello ");
    })
    .listen(8080);
  console.log(`worker ${process.pid} started`);
}
