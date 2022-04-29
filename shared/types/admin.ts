import { IAdminModel } from "../../server/database/models/admin/admin";

export interface IAdminCreateData {
  username: string;
  password: string;
}

export interface IAdminLoginData {
  username: string;
  password: string;
}

export interface IAdminLoginResponse {
  username: string;
  avatar: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IAuthAdmin extends IAdminLoginResponse { }

export interface IAdminAuthToken {
  adminId: string;
}

export interface IAdmin extends IAdminModel {
  _id: string;
}
