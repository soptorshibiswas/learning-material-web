import { createConnectionAndInitialize, closeConnection } from "../server/database/createConnection";
import config from "../settings/config";
import { makeMockRequest } from "./mocks/mock-request";
import { makeMockResponse } from "./mocks/mock-response";
import University from "../server/controllers/learning/universityController";

describe("controllers/university", () => {
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

    it('should return 201 when new university is created', async () => {
        // mocks
        const req = makeMockRequest({ body: { name: "New University 10", abbr: "NU10" } });

        // act
        await University.createUniversity(req, res);

        // assert
        expect(res.state.status).toBe(201);
    });

    it('should return 400 if University already exists with the name or abbreviation when creating', async () => {
        // mocks
        const req = makeMockRequest({ body: { name: "New University", abbr: "bracu" } });

        // act
        await University.createUniversity(req, res);

        // assert
        expect(res.state.status).toBe(400);
    });

    it('should return 200 when university is updated successfully', async () => {
        // mocks
        const req = makeMockRequest({ body: { name: "North South University" }, params: { universityId: "6250562578f2a7ee303318f6" } });

        // act
        await University.updateUniversity(req, res);

        // assert
        expect(res.state.status).toBe(200);
    });

    it('should return 404 if university not found by id when updating', async () => {
        // mocks
        const req = makeMockRequest({ body: { name: "North South University" }, params: { universityId: "6250562578f2a7ee303318f7" } });

        // act
        await University.updateUniversity(req, res);

        // assert
        expect(res.state.status).toBe(404);
    });

    it('should return 400 when other university already exists with same username or abbreviation', async () => {
        // mocks
        const req = makeMockRequest({ body: { name: "North South University" }, params: { universityId: "6250562578f2a7ee303318f6" } });

        // act
        await University.createUniversity(req, res);

        // assert
        expect(res.state.status).toBe(400);
    });

    it('should return 200 when university is deleted successfully', async () => {
        // mocks
        const req = makeMockRequest({ params: { universityId: "626c371f86f28027854c282f" } });

        // act
        await University.deleteUniversity(req, res);

        // assert
        expect(res.state.status).toBe(200);
    });

    it('should return 404 when university is not found when deleting', async () => {
        // mocks
        const req = makeMockRequest({ params: { universityId: "626bdf4eb14148e6d9cbab20" } });

        // act
        await University.deleteUniversity(req, res);

        // assert
        expect(res.state.status).toBe(404);
    });

    it('should return 200 when all universities returned', async () => {
        // mocks
        const req = makeMockRequest({});

        // act
        await University.getAllUniversities(req, res);

        // assert
        expect(res.state.status).toBe(200);
    });

    it('should return 200 when university found by id', async () => {
        // mocks
        const req = makeMockRequest({ params: { universityId: "6246ba1b7786b32ff21b4435" } });

        // act
        await University.getUniversityById(req, res);

        // assert
        expect(res.state.status).toBe(200);
    });

    it('should return 404 when university not found when searching by id', async () => {
        // mocks
        const req = makeMockRequest({ params: { universityId: "6246ba1b7786b32ff21b4436" } });

        // act
        await University.getUniversityById(req, res);

        // assert
        expect(res.state.status).toBe(404);
    });

    it('should return 200 when university found by abbreviation', async () => {
        // mocks
        const req = makeMockRequest({ params: { abbr: "bracu" } });

        // act
        await University.getUniversityByAbbr(req, res);

        // assert
        expect(res.state.status).toBe(200);
    });

    it('should return 404 when university not found when searching by abbreviation', async () => {
        // mocks
        const req = makeMockRequest({ params: { abbr: "not-bracu" } });

        // act
        await University.getUniversityByAbbr(req, res);

        // assert
        expect(res.state.status).toBe(404);
    });

    it('should return 200 when getting stats of universities', async () => {
        // mocks
        const req = makeMockRequest({});

        // act
        await University.getStats(req, res);

        // assert
        expect(res.state.status).toBe(200);
    });
});