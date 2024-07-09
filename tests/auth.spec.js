import request from "supertest";
import app from "../app.js";
import prisma from "../src/middlewares/prismaclientconfig.js";

beforeAll(async () => {
  await prisma.$connect();
  await prisma.user.deleteMany();
  await prisma.organization.deleteMany();
}, 10000);

afterAll(async () => {
  await prisma.user.deleteMany();
  await prisma.organization.deleteMany();
  await prisma.$disconnect();
}, 10000);
const user = {
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  password: "password123",
};

let token;

describe("It Should Register User Successfully with Default Organisation", () => {
  it("Should register user successfully", async () => {
    const res = await request(app).post("/auth/register").send(user);

    expect(res.statusCode).toEqual(201); // Expecting 201 for success
    expect(res.body).toHaveProperty("status", "success");
    expect(res.body).toHaveProperty("message", "Registration successful");
    expect(res.body).toHaveProperty("data");
    expect(res.body.data).toHaveProperty("accessToken");
    expect(res.body.data).toHaveProperty("user");
    expect(res.body.data.user).toHaveProperty("firstName", user.firstName);
    expect(res.body.data.user).toHaveProperty("lastName", user.lastName);
    expect(res.body.data.user).toHaveProperty("email", user.email);
    expect(res.body.data.user).not.toHaveProperty("organisation");

    token = res.body.data.accessToken;
  }, 10000);

  it("Default Organisation", async () => {
    const res = await request(app)
      .get("/api/organisations")
      .set("Authorization", `Bearer ${token}`);
    const organisationName = res.body.data.organisations.some(
      (name) => name.name === `${user.firstName}'s organisation`
    );
    expect(res.status).toEqual(200);
    expect(organisationName).toBe(true);
  }, 10000);
});

describe("It Should Log the user in successfully", () => {
  it("should log the user in successfully", async () => {
    const loginRes = await request(app).post("/auth/login").send({
      email: "john.doe@example.com",
      password: "password123",
    });

    expect(loginRes.statusCode).toEqual(200);
    expect(loginRes.body).toHaveProperty("status", "success");
    expect(loginRes.body).toHaveProperty("message");
    expect(loginRes.body).toHaveProperty("data");
    expect(loginRes.body.data).toHaveProperty("accessToken");
    expect(loginRes.body.data).toHaveProperty("user");
    expect(loginRes.body.data.user).toHaveProperty("firstName", "John");
    expect(loginRes.body.data.user).toHaveProperty("lastName", "Doe");
    expect(loginRes.body.data.user).toHaveProperty(
      "email",
      "john.doe@example.com"
    );
    expect(loginRes.body.data.user).toHaveProperty("phone"); // Adjust as per actual structure
  }, 10000);
});

describe("It should fail if required fields are missing", () => {
  it("should fail if required fields are missing", async () => {
    const res = await request(app).post("/auth/register").send({
      lastName: "Bitege",
      email: "landry@gmail.com",
      password: "password123",
    });
    console.log(res.body);
    expect(res.statusCode).toEqual(422); // Adjusted to 422 for missing fields
    expect(res.body).toHaveProperty("errors");
    expect(res.body.errors[0]).toHaveProperty("field", "firstName");
    expect(res.body.errors[0]).toHaveProperty(
      "message",
      "firstName is required"
    );
  }, 10000);
  // it("should fail if there is a duplicate email", async () => {
  //     // Register a user with the same email first
  //     await request(app).post("/auth/register").send({
  //         firstName: "Jane",
  //         lastName: "Doe",
  //         email: "jane.doe@example.com",
  //         password: "password123",
  //     });
  //     // Attempt to register the same email again
  //     const duplicateRes = await request(app).post("/auth/register").send({
  //         firstName: "John",
  //         lastName: "Smith",
  //         email: "jane.doe@example.com", // This email should already exist
  //         password: "anotherPassword",
  //     });
  //     expect(duplicateRes.statusCode).toEqual(422); // Expecting 422 for duplicate email
  //     // expect(duplicateRes.body).toHaveProperty("status", "error");
  //     expect(duplicateRes.body).toHaveProperty("message", "Email already exists");
  // });
});
