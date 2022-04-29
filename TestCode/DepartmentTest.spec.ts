import { createConnectionAndInitialize, closeConnection } from "../server/database/createConnection";
import config from "../settings/config";
import { makeMockRequest } from "./mocks/mock-request";
import { makeMockResponse } from "./mocks/mock-response";
import Department from "../server/controllers/learning/departmentController";

describe("controllers/department", () => {
    const res = makeMockResponse();

    beforeAll(() => {
        createConnectionAndInitialize(config.dbUrl)
            .then()
            .catch((err) => {
                console.error(err);
                process.exit(1);
            });
    });

    afterAll(() => {
        closeConnection().then().catch((err) => {
            console.error(err);
            process.exit(1);
        });
    });

    it('should return 201 when new Department is created', async () => {
        // mocks
        const req = makeMockRequest({
            body: {
                name: "New Department 2",
                abbr: "ND2", totalSemesters: 2,
                semesters: [{ name: "1-1" }, { name: "1-2" }]
            },
            params: { universityId: "626be49ab14148e6d9d01698" }
        });

        // act
        await Department.createDepartment(req, res);

        // assert
        expect(res.state.status).toBe(201);
    });

    it('should return 400 if all semesters are not provided when creating', async () => {
        // mocks
        const req = makeMockRequest({
            body: {
                name: "New Department",
                abbr: "ND", totalSemesters: 2, semesters: [{ name: "1-1" }]
            },
            params: { universityId: "626be49ab14148e6d9d01698" }
        });

        // act
        await Department.createDepartment(req, res);

        // assert
        expect(res.state.status).toBe(400);
    });

    it('should return 400 if semester names are not unique when creating', async () => {
        // mocks
        const req = makeMockRequest({
            body: {
                name: "New Department", abbr: "ND",
                totalSemesters: 2, semesters: [{ name: "1-1" }, { name: "1-1" }]
            },
            params: { universityId: "626be49ab14148e6d9d01698" }
        });

        // act
        await Department.createDepartment(req, res);

        // assert
        expect(res.state.status).toBe(400);
    });

    it('should return 404 if university not found when creating department', async () => {
        // mocks
        const req = makeMockRequest({
            body: {
                name: "New Department", abbr: "ND",
                totalSemesters: 2, semesters: [{ name: "1-1" }, { name: "1-2" }]
            },
            params: { universityId: "626be49ab14148e6d9d01693" }
        });

        // act
        await Department.createDepartment(req, res);

        // assert
        expect(res.state.status).toBe(404);
    });

    it('should return 400 if Department with name or abbreviation already exists in university when creating department', async () => {
        // mocks
        const req = makeMockRequest({
            body: {
                name: "New Department", abbr: "cse",
                totalSemesters: 2, semesters: [{ name: "1-1" }, { name: "1-2" }]
            },
            params: { universityId: "6246ba1b7786b32ff21b4435" }
        });

        // act
        await Department.createDepartment(req, res);

        // assert
        expect(res.state.status).toBe(400);
    });

    it('should return 200 when Department is updated successfully', async () => {
        // mocks
        const req = makeMockRequest({
            body: {
                name: "Computer science & engineering", abbr: "cse",
            },
            params: { departmentId: "6246e4917786b32ff21b4451" }
        });

        // act
        await Department.updateDepartment(req, res);

        // assert
        expect(res.state.status).toBe(200);
    });

    it('should return 404 if Department not found by id when updating', async () => {
        // mocks
        const req = makeMockRequest({
            body: { name: "New Department", abbr: "ND" },
            params: { departmentId: "6246e4917786b32ff21b4452" }
        });

        // act
        await Department.updateDepartment(req, res);

        // assert
        expect(res.state.status).toBe(404);
    });

    it('should return 400 if all semesters are not provided when updating', async () => {
        // mocks
        const req = makeMockRequest({
            body: {
                name: "New Department",
                abbr: "ND", totalSemesters: 2, semesters: [{ name: "1-1" }]
            },
            params: { departmentId: "6246e4917786b32ff21b4451" }
        });

        // act
        await Department.updateDepartment(req, res);

        // assert
        expect(res.state.status).toBe(400);
    });

    it('should return 400 if semester names are not unique when updating', async () => {
        // mocks
        const req = makeMockRequest({
            body: {
                name: "New Department", abbr: "ND",
                totalSemesters: 2, semesters: [{ name: "1-1" }, { name: "1-1" }]
            },
            params: { departmentId: "6246e4917786b32ff21b4451" }
        });

        // act
        await Department.updateDepartment(req, res);

        // assert
        expect(res.state.status).toBe(400);
    });

    it('should return 400 when other Department already exists with same username or abbreviation', async () => {
        // mocks
        const req = makeMockRequest({
            body: { name: "Department1", abbr: "eee" },
            params: { departmentId: "6246e4917786b32ff21b4451" }
        });

        // act
        await Department.updateDepartment(req, res);

        // assert
        expect(res.state.status).toBe(400);
    });

    it('should return 200 when Department is deleted successfully', async () => {
        // mocks
        const req = makeMockRequest({ params: { departmentId: "626c2de7f2a64d86b4daa1fe" } });

        // act
        await Department.deleteDepartment(req, res);

        // assert
        expect(res.state.status).toBe(200);
    });

    it('should return 404 when Department is not found when deleting', async () => {
        // mocks
        const req = makeMockRequest({ params: { DepartmentId: "626bff41b14148e6d9e6acc2" } });

        // act
        await Department.deleteDepartment(req, res);

        // assert
        expect(res.state.status).toBe(404);
    });

    it('should return 200 when all departments returned by university id', async () => {
        // mocks
        const req = makeMockRequest({ params: { universityId: "6246ba1b7786b32ff21b4435" } });

        // act
        await Department.getAllDepartmentsByUniversity(req, res);

        // assert
        expect(res.state.status).toBe(200);
    });

    it('should return 200 when all departments returned by university abbreviation', async () => {
        // mocks
        const req = makeMockRequest({ params: { universityAbbr: "bracu" } });

        // act
        await Department.getDepartmentsByUniversityAbbr(req, res);

        // assert
        expect(res.state.status).toBe(200);
    });

    it('should return 200 when Department found by id', async () => {
        // mocks
        const req = makeMockRequest({ params: { departmentId: "6246e4917786b32ff21b4451" } });

        // act
        await Department.getDepartment(req, res);

        // assert
        expect(res.state.status).toBe(200);
    });

    it('should return 404 when Department not found when searching by id', async () => {
        // mocks
        const req = makeMockRequest({ params: { departmentId: "6246e4917786b32ff21b4455" } });

        // act
        await Department.getDepartment(req, res);

        // assert
        expect(res.state.status).toBe(404);
    });

    it('should return 200 when Department found by slug', async () => {
        // mocks
        const req = makeMockRequest({ params: { departmentSlug: "bracu~cse" } });

        // act
        await Department.getDepartmentBySlug(req, res);

        // assert
        expect(res.state.status).toBe(200);
    });

    it('should return 404 when Department not found when searching by slug', async () => {
        // mocks
        const req = makeMockRequest({ params: { abbr: "not-bracu~cse" } });

        // act
        await Department.getDepartmentBySlug(req, res);

        // assert
        expect(res.state.status).toBe(404);
    });

    it('should return 200 when semester found by id', async () => {
        // mocks
        const req = makeMockRequest({ params: { semesterId: "6246e4917786b32ff21b4452" } });

        // act
        await Department.getSemesterById(req, res);

        // assert
        expect(res.state.status).toBe(200);
    });

    it('should return 404 when semester not found by id', async () => {
        // mocks
        const req = makeMockRequest({ params: { semesterId: "6246e4917786b32ff21b1234" } });

        // act
        await Department.getSemesterById(req, res);

        // assert
        expect(res.state.status).toBe(404);
    });

    it('should return 200 when semester found by slug', async () => {
        // mocks
        const req = makeMockRequest({ params: { semesterSlug: "bracu~cse~1-1" } });

        // act
        await Department.getSemesterBySlug(req, res);

        // assert
        expect(res.state.status).toBe(200);
    });

    it('should return 404 when semester not found by slug', async () => {
        // mocks
        const req = makeMockRequest({ params: { semesterSlug: "not-bracu~cse~1-1" } });

        // act
        await Department.getSemesterBySlug(req, res);

        // assert
        expect(res.state.status).toBe(404);
    });
});