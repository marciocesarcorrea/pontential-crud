import * as request from "supertest";

import { app } from "../app";
import { connection } from "./utils/helpers";

describe("App", () => {
  it("It should response the GET method with status 200", async () => {
    const response = await request(app).get("/");
    console.log(response.status);

    expect(response.status).toBe(200);
  });
  it("It should database has been configured", async () => {
    await expect(connection.create()).resolves.not.toThrow();
  });
});
