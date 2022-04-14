import * as yup from "yup";

export const createUniversitySchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  abbr: yup.string().required("Short name is required"),
  image: yup.string().required("Image is required"),
});

export const updateUniversitySchema = yup.object().shape({
  name: yup.string(),
  abbr: yup.string(),
  image: yup.string(),
});
