const request = require("supertest");
const app = require("../app");

test("health endpoint is available", async () => {
  const response = await request(app).get("/api/health");
  expect(response.statusCode).toBe(200);
  expect(response.body.status).toBe("ok");
});
