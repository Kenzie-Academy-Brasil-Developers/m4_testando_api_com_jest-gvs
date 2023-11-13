// userCreate.routes.spec.ts
import request from "supertest";
import app from "../../../app";
import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";

describe("Testing the user routes", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("Should be able to create a new user", async () => {
    const email = "email@mail.com";
    const name = "name";
    const age = 20;

    const userData = { email, name, age };

    const response = await request(app).post("/users").send(userData);

		expect(response.status).toBe(201); // <- linha alterada
    expect(response.body).toEqual(     // <- linha alterada
      expect.objectContaining({        // <- linha alterada
        id: 1,  // <- linha alterada
        email,  // <- linha alterada
        name,   // <- linha alterada
        age,    // <- linha alterada
      })        // <- linha alterada
    );          // <- linha alterada
  });
});