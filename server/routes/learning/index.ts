import express from "express";
import courseRouter from "./course";
import departmentRouter from "./department";
import materialRouter from "./material";
import universityRouter from "./university";

const router = express.Router();

router.use("/university", universityRouter);
router.use("/department", departmentRouter);
router.use("/course", courseRouter);
router.use("/material", materialRouter);

export default router;
