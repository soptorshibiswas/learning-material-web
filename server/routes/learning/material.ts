import express from "express";
import controller from "../../controllers/learning/materialController";
import { authenticator } from "../../middlewares/authenticator";
import inputValidator from "../../middlewares/inputValidator";
import {
  createMaterialSchema,
  updateMaterialSchema,
} from "../../validators/learning/materialValidators";

const materialRouter = express.Router();

materialRouter.get("/:materialId", controller.getMaterial);
materialRouter.get(
  "/all/courseSlug/:courseSlug",
  controller.getAllMaterialByCourseSlug
);
materialRouter.get("/all/:courseId", controller.getAllMaterialsByCourse);
materialRouter.post(
  "/create/:courseId",
  authenticator(),
  inputValidator(createMaterialSchema),
  controller.createMaterial
);
materialRouter.put(
  "/update/:materialId",
  authenticator(),
  inputValidator(updateMaterialSchema),
  controller.updateMaterial
);
materialRouter.delete(
  "/delete/:materialId",
  authenticator(),
  controller.deleteMaterial
);

export default materialRouter;
