import { makeMockRequest } from "./mocks/mock-request";
import { makeMockResponse } from "./mocks/mock-response";
import { createAdmin, loginAdmin, verifyAdmin } from "../server/controllers/adminControllers";
import { closeConnection, createConnectionAndInitialize } from "../server/database/createConnection";
import config from "../settings/config";

describe("controllers/admin", () => {
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

  it('should return 201 when admin is created', async () => {
    // mocks
    const req = makeMockRequest({ body: { username: "admin-learning", password: "pass2022" } });

    // act
    await createAdmin(req, res);

    // assert
    expect(res.state.status).toBe(201);
  });

  it('should return 400 when another admin is with same name', async () => {
    // mocks
    const req = makeMockRequest({ body: { username: "admin", password: "pass-learning" } });

    // act
    await createAdmin(req, res);

    // assert
    expect(res.state.status).toBe(400);
  });

  it('should return 200 after making admin verified', async () => {
    // mocks
    const req = makeMockRequest({ params: { adminId: "6246a5b3b51a6a68636829ca" } });

    // act
    await verifyAdmin(req, res);

    // assert
    expect(res.state.status).toBe(200);
  });

  it('should return 404 when no admin found', async () => {
    // mocks
    const req = makeMockRequest({ params: { adminId: "6246a5b3b51a6a68636829cb" } });

    // act
    await verifyAdmin(req, res);

    // assert
    expect(res.state.status).toBe(404);
  });

  it('should return 200 when admin is logged in', async () => {
    // mocks
    const req = makeMockRequest({ body: { username: "admin", password: "learning2022" } });

    // act
    await loginAdmin(req, res);

    // assert
    expect(res.state.status).toBe(200);
  });

  it('should return 404 when no matched username found', async () => {
    // mocks
    const req = makeMockRequest({ body: { username: "admin-404" } });

    // act
    await loginAdmin(req, res);

    // assert
    expect(res.state.status).toBe(404);
  });

  it('should return 400 when password is wrong', async () => {
    // mocks
    const req = makeMockRequest({ body: { username: "admin", password: "wrong-password" } });

    // act
    await loginAdmin(req, res);

    // assert
    expect(res.state.status).toBe(400);
  });

  it('should return 403 when admin is not verified', async () => {
    // mocks
    const req = makeMockRequest({ body: { username: "admin-not-verified", password: "pass2022" } });

    // act
    await loginAdmin(req, res);

    // assert
    expect(res.state.status).toBe(403);
  });
});
