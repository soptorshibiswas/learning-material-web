import express from "express";
import {
  createAdmin,
  changeAdminPassword,
  verifyAdmin,
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

router.post("/create", inputValidator(createAdminSchema), createAdmin);

router.get("/verify/central/:adminId", authenticator(), verifyAdmin);

router.put(
  "/update/:adminId",
  authenticator(),
  inputValidator(adminPasswordUpdateSchema, adminIdSchema),
  changeAdminPassword
);

router.post("/login", inputValidator(loginAdminSchema), loginAdmin);

router.get("/logout", logoutAdmin);

export default router;
