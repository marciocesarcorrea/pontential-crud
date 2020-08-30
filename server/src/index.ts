import "reflect-metadata";
import { createConnection } from "typeorm";
import { Environment, Logger } from "./configs";
import { app } from "./app";

const logger = new Logger("server");
createConnection().then(() => {
  app.listen(Environment.PORT, () => {
    logger.debug(`Is ready: ${Environment.PORT}`);
  });
});
