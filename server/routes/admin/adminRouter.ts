import express from "express";
import {
  createCentralAdmin,
  changeAdminPassword,
  verifyCentralAdmin,
  loginAdmin,
  logoutAdmin,
} from "../../controllers/adminControllers";
import { authenticator } from "../../middlewares/authenticator";
import inputValidator from "../../middlewares/inputValidator";
import {
  adminPasswordUpdateSchema,
  createAdminSchema,
  loginAdminSchema,
} from "../../validators/admin/adminValidators";
import { adminIdSchema } from "../../validators/commonValidators";

const router = express.Router();

router.post("/create", inputValidator(createAdminSchema), createCentralAdmin);

router.get("/verify/central/:adminId", authenticator(), verifyCentralAdmin);

router.put(
  "/update/:adminId",
  authenticator(),
  inputValidator(adminPasswordUpdateSchema, adminIdSchema),
  changeAdminPassword
);

router.post("/login", inputValidator(loginAdminSchema), loginAdmin);

router.get("/logout", logoutAdmin);

export default router;
