import express from "express";
import controller from "../../controllers/learning/courseController";
import { authenticator } from "../../middlewares/authenticator";
import inputValidator from "../../middlewares/inputValidator";
import {
  createCourseSchema,
  updateCourseSchema,
} from "../../validators/learning/courseValidators";

const courseRouter = express.Router();

courseRouter.get("/:courseId", controller.getCourse);
courseRouter.get("/courseSlug/:courseSlug", controller.getCourseBySlug);
courseRouter.get("/all/:semesterId", controller.getAllCoursesBySemester);
courseRouter.get(
  "/all/semesterSlug/:semesterSlug",
  controller.getCoursesBySemesterSlug
);
courseRouter.post(
  "/create/:semesterId",
  authenticator(),
  inputValidator(createCourseSchema),
  controller.createCourse
);
courseRouter.put(
  "/update/:courseId",
  authenticator(),
  inputValidator(updateCourseSchema),
  controller.updateCourse
);
courseRouter.delete(
  "/delete/:courseId",
  authenticator(),
  controller.deleteCourse
);

export default courseRouter;
