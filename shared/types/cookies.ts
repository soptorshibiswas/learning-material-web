interface IAuth {
  authAccessToken: string;
  authAdmin: string;
}

export const COOKIE_KEYS: IAuth = {
  authAccessToken: "learning.authAccessToken",
  authAdmin: "learning.admin",
};
