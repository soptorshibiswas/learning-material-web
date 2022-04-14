import { AxiosError } from "axios";

export type ILearningApiError = AxiosError<{ message: string }>;

export const GET_LEARNING_STATS = () => `/api/v1/learning/university/get-stats`;

/** University */
export const GET_ALL_UNIVERSITY = () => `/api/v1/learning/university/all`;
export const GET_UNIVERSITY_BY_ABBR = (abbr: string) =>
  `/api/v1/learning/university/abbr/${abbr}`;
export const GET_UNIVERSITY = (id: string) =>
  `/api/v1/learning/university/get/${id}`;
export const CREATE_UNIVERSITY = () => `/api/v1/learning/university/create`;
export const UPDATE_UNIVERSITY = (id: string) =>
  `/api/v1/learning/university/update/${id}`;
export const DELETE_UNIVERSITY = (id: string) =>
  `/api/v1/learning/university/delete/${id}`;

/** Departments */
export const GET_ALL_DEPTS_BY_UNI_ABBR = (uniAbbr: string) =>
  `/api/v1/learning/department/all/universityAbbr/${uniAbbr}`;
export const GET_DEPTS_BY_UNI_ID = (uniId: string) =>
  `/api/v1/learning/department/all/${uniId}`;
export const GET_DEPT = (id: string) => `/api/v1/learning/department/${id}`;
export const CREATE_DEPT = (uniId: string) =>
  `/api/v1/learning/department/create/${uniId}`;
export const UPDATE_DEPT = (id: string) =>
  `/api/v1/learning/department/update/${id}`;
export const DELETE_DEPT = (id: string) =>
  `/api/v1/learning/department/delete/${id}`;

export const GET_SEM_BY_SLUG = (semSlug: string) =>
  `/api/v1/learning/department/semester/semesterSlug/${semSlug}`;
export const GET_SEM_BY_ID = (semId: string) =>
  `/api/v1/learning/department/semester/${semId}`;

/** Courses */
export const GET_ALL_COURSES_BY_SEM_ID = (semId: string) =>
  `/api/v1/learning/course/all/${semId}`;
export const GET_ALL_COURSES_BY_SEM_SLUG = (semSlug: string) =>
  `/api/v1/learning/course/all/semesterSlug/${semSlug}`;
export const GET_COURSE_BY_ID = (courseId: string) =>
  `/api/v1/learning/course/${courseId}`;
export const GET_COURSE_BY_SLUG = (cSlug: string) =>
  `/api/v1/learning/course/courseSlug/${cSlug}`;
export const CREATE_COURSE = (semId: string) =>
  `/api/v1/learning/course/create/${semId}`;
export const UPDATE_COURSE = (id: string) =>
  `/api/v1/learning/course/update/${id}`;
export const DELETE_COURSE = (id: string) =>
  `/api/v1/learning/course/delete/${id}`;

/** Materials */
export const GET_ALL_MATERIALS_BY_COURSE_SLUG = (cSlug: string) =>
  `/api/v1/learning/material/all/courseSlug/${cSlug}`;
export const GET_ALL_MATERIALS_BY_COURSE_ID = (cId: string) =>
  `/api/v1/learning/material/all/${cId}`;
export const GET_MATERIAL = (id: string) => `/api/v1/learning/material/${id}`;
export const CREATE_MATERIAL = (courseId: string) =>
  `/api/v1/learning/material/create/${courseId}`;
export const UPDATE_MATERIAL = (id: string) =>
  `/api/v1/learning/material/update/${id}`;
export const DELETE_MATERIAL = (id: string) =>
  `/api/v1/learning/material/delete/${id}`;
