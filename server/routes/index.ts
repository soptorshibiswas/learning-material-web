import express from "express";
import AdminRouter from "./admin/adminRouter";
import LearningRouter from "./learning";

const router = express.Router();

router.use("/admin", AdminRouter);
router.use("/learning", LearningRouter);
router.all("*", (_req, res) => {
  res.status(404).send("Route not found");
});

export { router };
