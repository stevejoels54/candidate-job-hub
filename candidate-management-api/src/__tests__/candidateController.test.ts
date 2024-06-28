import request from "supertest";
import app from "../app";
import { ICandidate } from "../types";
import CandidateSQL from "../../src/models/sql/Candidate";
import CandidateNoSQL from "../../src/models/nosql/Candidate"; // Adjust the import to your NoSQL model

const dbType = process.env.DATABASE_TYPE;

describe("Candidate Controller", () => {
  let candidate: ICandidate;

  beforeAll(() => {
    candidate = {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phoneNumber: "123-456-7890",
      callInterval: "9AM-5PM",
      linkedin: "https://www.linkedin.com/in/johndoe",
      github: "https://github.com/johndoe",
      comment: "This is a test candidate",
    };
  });

  afterAll(async () => {
    if (dbType === "SQL") {
      await CandidateSQL.destroy({ where: {}, truncate: true });
    } else if (dbType === "NoSQL") {
      await CandidateNoSQL.deleteMany({});
    }
  });

  it("should add a new candidate", async () => {
    const response = await request(app)
      .post("/api/candidates")
      .send(candidate)
      .expect("Content-Type", /json/)
      .expect(201);

    expect(response.body).toMatchObject(candidate);
  });

  it("should update an existing candidate", async () => {
    const updatedCandidate = { ...candidate, firstName: "Jane" };

    const response = await request(app)
      .put(`/api/candidates`)
      .send(updatedCandidate)
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body.firstName).toBe("Jane");
  });

  it("should get a candidate by email", async () => {
    const response = await request(app)
      .get(`/api/candidates/${candidate.email}`)
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body.email).toBe(candidate.email);
  });

  it("should get all candidates", async () => {
    const response = await request(app)
      .get("/api/candidates")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
  });

  it("should delete a candidate by email", async () => {
    await request(app).delete(`/api/candidates/${candidate.email}`).expect(204);
  });
});
