import * as yup from "yup";
import { materialTypes } from "../../../shared/types/learning";

export const createMaterialSchema = yup.object().shape({
  type: yup
    .string()
    .oneOf(materialTypes)
    .required("Type of course material is required"),
  file: yup.string().required("Link to file required"),
  name: yup.string(),
  sessionYear: yup.string(),
  author: yup.string(),
  courseCode: yup.string(),
});

export const updateMaterialSchema = yup.object().shape({
  type: yup.string().oneOf(materialTypes),
  file: yup.string(),
  name: yup.string(),
  sessionYear: yup.string(),
  author: yup.string(),
  courseCode: yup.string(),
});
