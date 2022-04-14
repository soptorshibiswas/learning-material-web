import * as yup from "yup";

export const createDepartmentSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  abbr: yup.string().required("Short name is required"),
  totalSemesters: yup.number().required("Total number of semester is required"),
  semesters: yup
    .array(yup.object().shape({ name: yup.string() }))
    .required("Semesters in department is required"),
});

export const updateDepartmentSchema = yup.object().shape({
  name: yup.string(),
  abbr: yup.string(),
  totalSemesters: yup.number(),
  semesters: yup.array(yup.object().shape({ name: yup.string() })),
});
