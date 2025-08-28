import request from "supertest";
import app from "../src/index";
import mongoose from "mongoose";
import Todo from "../src/models/Todo";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

beforeEach(async () => {
  await Todo.deleteMany({});
});

describe("Todo API", () => {
  it("deve criar uma nova tarefa", async () => {
    const res = await request(app).post("/api/todos").send({
      title: "Estudar React",
      color: "#ff0000",
    });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("_id");
  });

  it("deve listar as tarefas", async () => {
    await Todo.create({ title: "Teste Listar" });
    const res = await request(app).get("/api/todos");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(1);
  });

  it("deve atualizar uma tarefa (favoritar)", async () => {
    const todo = await Todo.create({ title: "Test Favorito" });
    const res = await request(app).put(`/api/todos/${todo._id}`).send({
      favorite: true,
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.favorite).toBe(true);
  });

  it("deve deletar uma tarefa", async () => {
    const todo = await Todo.create({ title: "Test Delete" });
    const res = await request(app).delete(`/api/todos/${todo._id}`);
    expect(res.statusCode).toBe(204);
  });
});
