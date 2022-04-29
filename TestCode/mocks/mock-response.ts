import { CookieOptions, Response } from 'express';

export type MockResponse<TResult> = Response & {
  state: {
    status?: number;
    json?: TResult | unknown;
    cookie?: any;
  }
}

export function makeMockResponse<TResult>(): MockResponse<TResult> {
  const res = {
    state: {
    }
  } as MockResponse<TResult>;

  res.status = (status: number) => {
    res.state.status = status;
    return res;
  };

  res.json = (json: TResult) => {
    res.state.json = json;
    return res;
  };

  res.cookie = (name: string, val: any, options?: CookieOptions) => {
    res.state.cookie = { name, val, options };
    return res;
  };

  //   res.end = () => { return; };

  return res;
}
