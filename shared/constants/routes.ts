// ADMIN ROUTES

export const ADMIN_HOME = () => "/admin";
export const ADMIN_LOGIN = () => "/admin/login";

export const ADMIN_LEARNING_UNI = (id: string) => `/admin/university/${id}`;
export const ADMIN_LEARNING_SEMESTER = (deptId: string, semId: string) =>
  `/admin/department/${deptId}/semester/${semId}`;
export const ADMIN_LEARNING_COURSE = (id: string) => `/admin/course/${id}`;

export const HOME = () => "/";
export const LEARNING = () => "/learning";
