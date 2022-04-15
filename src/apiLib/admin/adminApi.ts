import { AxiosResponse } from "axios";
import {
  IAdminLoginData,
  IAdminLoginResponse,
} from "../../../shared/types/admin";
import { apiRequest } from "../apiRequest";
import { ADMIN_LOGIN, ADMIN_LOGOUT } from "./adminApiURLs";

export function loginAdminApi(data: IAdminLoginData) {
  return new Promise<AxiosResponse<IAdminLoginResponse>>((resolve, reject) => {
    apiRequest()
      .post(ADMIN_LOGIN(), data)
      .then((resp) => {
        resolve(resp);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function logoutAdminApi() {
  return new Promise<AxiosResponse>((resolve, reject) => {
    apiRequest()
      .get(ADMIN_LOGOUT())
      .then((resp) => {
        resolve(resp);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
