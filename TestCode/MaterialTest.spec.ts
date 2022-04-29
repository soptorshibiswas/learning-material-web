import { createConnectionAndInitialize, closeConnection } from "../server/database/createConnection";
import config from "../settings/config";
import { makeMockRequest } from "./mocks/mock-request";
import { makeMockResponse } from "./mocks/mock-response";
import Material from "../server/controllers/learning/materialController";

describe("controllers/material", () => {
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

    it('should return 201 when new Material is created', async () => {
        // mocks
        const req = makeMockRequest({
            body: {
                name: "reference book",
                type: "refBook",
                file: "book link",
                author: "book author"
            },
            params: { courseId: "62470ce67786b32ff21b44c5" }
        });

        // act
        await Material.createMaterial(req, res);

        // assert
        expect(res.state.status).toBe(201);
    });

    it('should return 404 if course found when creating Material', async () => {
        // mocks
        const req = makeMockRequest({
            body: {
                name: "reference book",
                type: "refBook",
                file: "book link",
                author: "book author"
            },
            params: { courseId: "62470ce67786b32ff21b44a5" }
        });

        // act
        await Material.createMaterial(req, res);

        // assert
        expect(res.state.status).toBe(404);
    });

    it('should return 400 if Material with same name already exists in course when creating Material', async () => {
        // mocks
        const req = makeMockRequest({
            body: {
                name: "Thinking in Java"
            },
            params: { courseId: "62470ce67786b32ff21b44c5" }
        });

        // act
        await Material.createMaterial(req, res);

        // assert
        expect(res.state.status).toBe(400);
    });

    it('should return 200 when Material is updated successfully', async () => {
        // mocks
        const req = makeMockRequest({
            body: {
                name: "Thinking in Java"
            },
            params: { materialId: "624715e87786b32ff21b44e1" }
        });

        // act
        await Material.updateMaterial(req, res);

        // assert
        expect(res.state.status).toBe(200);
    });

    it('should return 404 if Material not found by id when updating', async () => {
        // mocks
        const req = makeMockRequest({
            body: {
                name: "Thinking in Java"
            },
            params: { materialId: "624715e87786b32ff21b44b1" }
        });

        // act
        await Material.updateMaterial(req, res);

        // assert
        expect(res.state.status).toBe(404);
    });

    it('should return 400 when other Material already exists with same name in course', async () => {
        // mocks
        const req = makeMockRequest({
            body: {
                name: "new book"
            },
            params: { materialId: "624715e87786b32ff21b44e1" }
        });

        // act
        await Material.updateMaterial(req, res);

        // assert
        expect(res.state.status).toBe(400);
    });

    it('should return 200 when Material is deleted successfully', async () => {
        // mocks
        const req = makeMockRequest({ params: { materialId: "626c330c86f28027854b1fb9" } });

        // act
        await Material.deleteMaterial(req, res);

        // assert
        expect(res.state.status).toBe(200);
    });

    it('should return 404 when Material is not found when deleting', async () => {
        // mocks
        const req = makeMockRequest({ params: { materialId: "626c330c86f28027854b1fc9" } });

        // act
        await Material.deleteMaterial(req, res);

        // assert
        expect(res.state.status).toBe(404);
    });

    it('should return 200 when all Materials returned by course id', async () => {
        // mocks
        const req = makeMockRequest({ params: { courseId: "62470ce67786b32ff21b44c5" } });

        // act
        await Material.getAllMaterialsByCourse(req, res);

        // assert
        expect(res.state.status).toBe(200);
    });

    it('should return 200 when all Materials returned by course slug', async () => {
        // mocks
        const req = makeMockRequest({ params: { courseSlug: "bracu~cse~1-1~programming language" } });

        // act
        await Material.getAllMaterialByCourseSlug(req, res);

        // assert
        expect(res.state.status).toBe(200);
    });

    it('should return 200 when Material found by id', async () => {
        // mocks
        const req = makeMockRequest({ params: { materialId: "624715e87786b32ff21b44e1" } });

        // act
        await Material.getMaterial(req, res);

        // assert
        expect(res.state.status).toBe(200);
    });

    it('should return 404 when Material not found when searching by id', async () => {
        // mocks
        const req = makeMockRequest({ params: { materialId: "624715e87786b32ff21b44e2" } });

        // act
        await Material.getMaterial(req, res);

        // assert
        expect(res.state.status).toBe(404);
    });
});