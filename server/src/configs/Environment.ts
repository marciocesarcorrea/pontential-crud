import * as dotenv from "dotenv";

dotenv.config();

export class Environment {
  static IS_TEST = process.env.NODE_ENV === "test";
  static IS_DEV = process.env.NODE_ENV === "development";
  static PORT = parseInt(process.env.PORT ?? "9999");
}
