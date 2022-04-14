import * as yup from "yup";
import { courseTypes } from "../../../shared/types/learning";

export const createCourseSchema = yup.object().shape({
  name: yup.string().required("Course name is required"),
  type: yup.string().oneOf(courseTypes).required("Course type is required"),
  code: yup.string().required("Course code is required"),
});

export const updateCourseSchema = yup.object().shape({
  name: yup.string(),
  type: yup.string().oneOf(courseTypes),
  code: yup.string(),
});
