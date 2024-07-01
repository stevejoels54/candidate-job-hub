"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const Candidate_1 = __importDefault(require("../../src/models/sql/Candidate"));
const Candidate_2 = __importDefault(require("../../src/models/nosql/Candidate")); // Adjust the import to your NoSQL model
const dbType = process.env.DATABASE_TYPE;
describe("Candidate Controller", () => {
    let candidate;
    beforeAll(() => {
        candidate = {
            firstName: "John",
            lastName: "Doe",
            email: "john.doe@example.com",
            phoneNumber: "1234567890",
            callInterval: "9AM-5PM",
            linkedin: "https://www.linkedin.com/in/johndoe",
            github: "https://github.com/johndoe",
            comment: "This is a test candidate",
        };
    });
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        if (dbType === "SQL") {
            yield Candidate_1.default.destroy({ where: {}, truncate: true });
        }
        else if (dbType === "NoSQL") {
            yield Candidate_2.default.deleteMany({});
        }
    }));
    it("should add a new candidate", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/api/candidates")
            .send(candidate)
            .expect("Content-Type", /json/)
            .expect(201);
        expect(response.body).toMatchObject(candidate);
    }));
    it("should update an existing candidate", () => __awaiter(void 0, void 0, void 0, function* () {
        const updatedCandidate = Object.assign(Object.assign({}, candidate), { firstName: "Jane" });
        const response = yield (0, supertest_1.default)(app_1.default)
            .put(`/api/candidates`)
            .send(updatedCandidate)
            .expect("Content-Type", /json/)
            .expect(200);
        expect(response.body.firstName).toBe("Jane");
    }));
    it("should get a candidate by email", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .get(`/api/candidates/${candidate.email}`)
            .expect("Content-Type", /json/)
            .expect(200);
        expect(response.body.email).toBe(candidate.email);
    }));
    it("should get all candidates", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .get("/api/candidates")
            .expect("Content-Type", /json/)
            .expect(200);
        expect(Array.isArray(response.body)).toBe(true);
    }));
    it("should delete a candidate by email", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).delete(`/api/candidates/${candidate.email}`).expect(204);
    }));
    // New tests for validation
    const requiredFields = [
        "firstName",
        "lastName",
        "email",
        "comment",
    ];
    requiredFields.forEach((field) => {
        it(`should return a validation error if ${field} is missing`, () => __awaiter(void 0, void 0, void 0, function* () {
            const invalidCandidate = Object.assign({}, candidate);
            delete invalidCandidate[field];
            const response = yield (0, supertest_1.default)(app_1.default)
                .post("/api/candidates")
                .send(invalidCandidate)
                .expect("Content-Type", /json/)
                .expect(400);
        }));
    });
});
