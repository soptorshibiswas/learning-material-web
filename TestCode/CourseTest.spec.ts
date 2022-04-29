import { createConnectionAndInitialize, closeConnection } from "../server/database/createConnection";
import config from "../settings/config";
import { makeMockRequest } from "./mocks/mock-request";
import { makeMockResponse } from "./mocks/mock-response";
import Course from "../server/controllers/learning/courseController";

describe("controllers/course", () => {
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

    it('should return 201 when new Course is created', async () => {
        // mocks
        const req = makeMockRequest({
            body: {
                name: "Programming language 4",
                type: "MIXED", code: "cse114"
            },
            params: { semesterId: "6246e4917786b32ff21b4452" }
        });

        // act
        await Course.createCourse(req, res);

        // assert
        expect(res.state.status).toBe(201);
    });

    it('should return 404 if department/semester not found when creating Course', async () => {
        // mocks
        const req = makeMockRequest({
            body: {
                name: "Programming language 3",
                type: "MIXED", code: "cse102"
            },
            params: { semesterId: "6246e4917786b32ff21b1234" }
        });

        // act
        await Course.createCourse(req, res);

        // assert
        expect(res.state.status).toBe(404);
    });

    it('should return 400 if Course with same name or code already exists in semester when creating Course', async () => {
        // mocks
        const req = makeMockRequest({
            body: {
                name: "Programming language 3",
                type: "MIXED", code: "cse111"
            },
            params: { semesterId: "6246e4917786b32ff21b4452" }
        });

        // act
        await Course.createCourse(req, res);

        // assert
        expect(res.state.status).toBe(400);
    });

    it('should return 200 when Course is updated successfully', async () => {
        // mocks
        const req = makeMockRequest({
            body: {
                name: "Programming language"
            },
            params: { courseId: "62470ce67786b32ff21b44c5" }
        });

        // act
        await Course.updateCourse(req, res);

        // assert
        expect(res.state.status).toBe(200);
    });

    it('should return 404 if Course not found by id when updating', async () => {
        // mocks
        const req = makeMockRequest({
            body: { name: "Programming language" },
            params: { courseId: "62470ce67786b32ff21b4410" }
        });

        // act
        await Course.updateCourse(req, res);

        // assert
        expect(res.state.status).toBe(404);
    });

    it('should return 400 when other Course already exists with same name/code in semester', async () => {
        // mocks
        const req = makeMockRequest({
            body: { name: "Programming language 2", code: "cse111" },
            params: { courseId: "62470ce67786b32ff21b44c5" }
        });

        // act
        await Course.updateCourse(req, res);

        // assert
        expect(res.state.status).toBe(400);
    });

    it('should return 200 when Course is deleted successfully', async () => {
        // mocks
        const req = makeMockRequest({ params: { courseId: "626c2de83973dd2eade2197f" } });

        // act
        await Course.deleteCourse(req, res);

        // assert
        expect(res.state.status).toBe(200);
    });

    it('should return 404 when Course is not found when deleting', async () => {
        // mocks
        const req = makeMockRequest({ params: { courseId: "626c297c86f2802785489941" } });

        // act
        await Course.deleteCourse(req, res);

        // assert
        expect(res.state.status).toBe(404);
    });

    it('should return 200 when all courses returned by semester id', async () => {
        // mocks
        const req = makeMockRequest({ params: { semesterId: "6246e4917786b32ff21b4452" } });

        // act
        await Course.getAllCoursesBySemester(req, res);

        // assert
        expect(res.state.status).toBe(200);
    });

    it('should return 200 when all courses returned by semester slug', async () => {
        // mocks
        const req = makeMockRequest({ params: { semesterSlug: "bracu~cse~1-1" } });

        // act
        await Course.getCoursesBySemesterSlug(req, res);

        // assert
        expect(res.state.status).toBe(200);
    });

    it('should return 200 when Course found by id', async () => {
        // mocks
        const req = makeMockRequest({ params: { courseId: "62470ce67786b32ff21b44c5" } });

        // act
        await Course.getCourse(req, res);

        // assert
        expect(res.state.status).toBe(200);
    });

    it('should return 404 when Course not found when searching by id', async () => {
        // mocks
        const req = makeMockRequest({ params: { courseId: "62470ce67786b32ff21b44a1" } });

        // act
        await Course.getCourse(req, res);

        // assert
        expect(res.state.status).toBe(404);
    });

    it('should return 200 when Course found by slug', async () => {
        // mocks
        const req = makeMockRequest({ params: { courseSlug: "bracu~cse~1-1" } });

        // act
        await Course.getCourseBySlug(req, res);

        // assert
        expect(res.state.status).toBe(200);
    });
});