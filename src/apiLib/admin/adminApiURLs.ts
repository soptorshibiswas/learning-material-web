import { AxiosError } from "axios";

export type IAdminApiError = AxiosError<{
  message: string;
  password?: string;
}>;

export const ADMIN_LOGIN = () => `/api/v1/admin/login`;
export const ADMIN_LOGOUT = () => `/api/v1/admin/logout`;
export const UPLOAD_IMAGE = () => `/api/v1/upload/image`;
