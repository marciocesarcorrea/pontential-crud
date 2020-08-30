import * as request from "supertest";

import { app } from "../app";
import { connection } from "./utils/helpers";

const DEV_1 = {
  nome: "Dev 1",
  sexo: "M",
  dataNascimento: "1983-06-26",
};

const createDeveloper = async (values: Record<string, any> = {}) => {
  return request(app)
    .post("/developers")
    .send({ ...DEV_1, ...values });
};

beforeAll(async () => {
  await connection.create();
});

afterAll(async () => {
  await connection.close();
});

beforeEach(async () => {
  await connection.clear();
});

describe("Test Developer routes", () => {
  it("Create a developer", async () => {
    const response = await createDeveloper();

    expect(response.status).toBe(201);
    expect(response.body.idade).toBe(37);
  });

  it("List developers", async () => {
    const response = await request(app).get("/developers");

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(0);
  });

  it("Find developers with query params", async () => {
    await createDeveloper();

    const response = await request(app).get("/developers").query({
      nome: DEV_1.nome,
    });

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
  });

  it("Expect an invalid response on search a developer", async () => {
    await createDeveloper();

    const response = await request(app).get("/developers").query({
      nome: "Dev 2",
    });

    expect(response.status).toBe(404);
  });

  it("Find a developer by id", async () => {
    const developer = await createDeveloper();
    const response = await request(app).get(`/developers/${developer.body.id}`);

    expect(response.status).toBe(200);
  });

  it("Expect an error on find a developer by invalid id", async () => {
    const response = await request(app).get(`/developers/9999`);

    expect(response.status).toBe(404);
  });

  it("Update a developer", async () => {
    const nome = "Dev 2";
    const developer = await createDeveloper();
    const response = await request(app)
      .put(`/developers/${developer.body.id}`)
      .send({ nome });

    expect(response.body.nome).toBe(nome);
  });

  it("Expect an error on update a developer", async () => {
    await createDeveloper();

    const response = await request(app).put(`/developers/13456`).send({
      nome: "Dev 3",
    });

    expect(response.status).toBe(400);
  });

  it("Delete a developer", async () => {
    const developer = await createDeveloper();
    const response = await request(app).delete(
      `/developers/${developer.body.id}`
    );

    expect(response.status).toBe(204);
  });

  it("Expect an error on delete a developer", async () => {
    const response = await request(app).delete(`/developers/123456`);
    expect(response.status).toBe(204);
  });
});
