import { Environment } from "./src/configs";

const DEFAULTS = {
  type: "postgres",
  host: "database",
  port: 5432,
  username: "postgres",
  password: "123456",
  logging: Environment.IS_DEV,
  entities: ["src/models/**/*.ts"],
  migrations: ["src/migration/**/*.ts"],
  subscribers: ["src/subscriber/**/*.ts"],
  cli: {
    entitiesDir: "src/models",
    migrationsDir: "src/migration",
    subscribersDir: "src/subscriber",
  },
};

module.exports = {
  database: Environment.IS_TEST ? "test" : "prod",
  ...DEFAULTS,
};
