import express from "express";
import controller from "../../controllers/learning/departmentController";
import { authenticator } from "../../middlewares/authenticator";
import inputValidator from "../../middlewares/inputValidator";
import {
  createDepartmentSchema,
  updateDepartmentSchema,
} from "../../validators/learning/departmentValidators";

const departmentRouter = express.Router();

departmentRouter.get("/:departmentId", controller.getDepartment);
departmentRouter.get(
  "/all/universityAbbr/:universityAbbr",
  controller.getDepartmentsByUniversityAbbr
);
departmentRouter.get(
  "/all/:universityId",
  controller.getAllDepartmentsByUniversity
);
departmentRouter.post(
  "/create/:universityId",
  authenticator(),
  inputValidator(createDepartmentSchema),
  controller.createDepartment
);
departmentRouter.put(
  "/update/:departmentId",
  authenticator(),
  inputValidator(updateDepartmentSchema),
  controller.updateDepartment
);
departmentRouter.delete(
  "/delete/:departmentId",
  authenticator(),
  controller.deleteDepartment
);
departmentRouter.get(
  "/semester/semesterSlug/:semesterSlug",
  controller.getSemesterBySlug
);
departmentRouter.get("/semester/:semesterId", controller.getSemesterById);

export default departmentRouter;
