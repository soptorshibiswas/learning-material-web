import express from "express";
import controller from "../../controllers/learning/universityController";
import { authenticator } from "../../middlewares/authenticator";
import inputValidator from "../../middlewares/inputValidator";
import {
  createUniversitySchema,
  updateUniversitySchema,
} from "../../validators/learning/universityValidators";

const universityRouter = express.Router();

universityRouter.get("/all", controller.getAllUniversities);
universityRouter.get("/abbr/:abbr", controller.getUniversityByAbbr);
universityRouter.get("/get/:universityId", controller.getUniversityById);
universityRouter.post(
  "/create",
  authenticator(),
  inputValidator(createUniversitySchema),
  controller.createUniversity
);
universityRouter.put(
  "/update/:universityId",
  authenticator(),
  inputValidator(updateUniversitySchema),
  controller.updateUniversity
);
universityRouter.delete(
  "/delete/:universityId",
  authenticator(),
  controller.deleteUniversity
);
universityRouter.get("/get-stats", controller.getStats);

export default universityRouter;
