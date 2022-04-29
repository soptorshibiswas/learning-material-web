/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-namespace */
import { IAdminDocument } from "../server/database/models/admin/admin";

declare global {
  namespace Express {
    interface Request {
      admin?: IAdminDocument;
    }
  }
}
