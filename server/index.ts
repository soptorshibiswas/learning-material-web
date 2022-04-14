import server from "./app";
import logger from "./util/winston";

const port = process.env.PORT || 5000;

server.listen(port, () => {
  logger.info(`learning-material server listening on ${port}`);
});
