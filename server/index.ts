import server from "./app";

const port = 7000;

server.listen(port, () => {
  console.log(`learning-material server listening on ${port}`);
});
