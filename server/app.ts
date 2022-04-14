import express, { NextFunction, Request, Response } from "express";
import next from "next";
import dotenv from "dotenv";
import logger from "./util/winston";
import errorHandler from "./middlewares/errorHandler";
dotenv.config();
require("express-async-errors");
import { createConnectionAndInitialize } from "./database/createConnection";
import config from "../settings/config";
import "../types/express.custom";
import { router } from "./routes";
import cookieParser from "cookie-parser";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const server = express();

createConnectionAndInitialize(config.dbUrl)
  .then()
  .catch((err) => {
    logger.error(err);
    process.exit(1);
  });

process.on("unhandledRejection", (error) => {
  throw error;
});

server.use(express.urlencoded({ extended: true })); // limit: '200mb',
server.use(express.json()); //{limit: '200mb'}

server.use((_req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  res.setHeader("Access-Control-Allow-Headers", "*");

  next();
});

server.use(cookieParser());

(async () => {
  try {
    await app.prepare();
    server.all("*", (req: Request, res: Response) => {
      return handle(req, res);
    });
  } catch (err: any) {
    logger.error(err);
    process.exit(1);
  }
})();

server.use("/api/v1", router);

server.use(errorHandler);

export default server;
