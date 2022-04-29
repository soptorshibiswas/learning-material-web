import { Request } from "express";
import { Params } from "express-serve-static-core";

export function makeMockRequest({ body, params, query }: { body?: any, params?: Params, query?: Params }): Request {
  const req = {
    body: body || {},
    params: params || {},
    query: query || {}
  } as unknown;
  return req as Request;
}
