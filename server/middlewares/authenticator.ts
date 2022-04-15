import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../../settings/config";
import Admin from "../database/models/admin/admin";
import { COOKIE_KEYS } from "../../shared/types/cookies";

function sendUnauthorized(res: Response) {
  return res.status(401).send("Unauthorized");
}

export function authenticator() {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // get authToken
      const cookies = req.cookies;
      const authToken = cookies[COOKIE_KEYS.authAccessToken];

      if (!authToken) return sendUnauthorized(res);

      // split token
      const token = authToken.split(" ")[1];
      if (!token) return sendUnauthorized(res);

      try {
        // get authToken
        const tokenData: any = jwt.decode(token);
        if (!tokenData) {
          return sendUnauthorized(res);
        }

        const verified = jwt.verify(token, config.adminSecret);
        if (!verified) return sendUnauthorized(res);

        const admin = await Admin.findOne(
          {
            _id: tokenData.adminId,
          },
          { password: 0 }
        );
        if (!admin) return sendUnauthorized(res);

        if (!admin.verified) return sendUnauthorized(res);

        req.admin = admin;

        next();
      } catch (err) {
        console.error("auth processor error");
        console.error(err);
        return sendUnauthorized(res);
      }
    } catch (err) {
      console.error(err);
      return sendUnauthorized(res);
    }
  };
}
