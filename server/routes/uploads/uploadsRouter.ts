import express from "express";
import multer from "multer";
import { authenticator } from "../../middlewares/authenticator";
import {
  checkImageFileType,
  resizeAndUploadToStorage,
} from "../../util/imageUtils";

const router = express.Router();
const upload = multer();

router.post(
  "/image",
  authenticator(),
  upload.single("image"),
  async (req, res) => {
    if (!req.admin || !req.file) {
      return res.status(400).json({ message: "Upload cannot be completed" });
    }
    const validFile = checkImageFileType(req.file);
    if (!validFile) {
      return res
        .status(400)
        .json({ message: "You can upload only .jpg, .jpeg or .png file" });
    }
    const _id = req.admin?._id;
    const id = (_id as string).toString();
    const imagePath = await resizeAndUploadToStorage(
      "uni_image",
      `${id.slice(id.length - 4)}_${new Date().getTime()}`,
      600,
      req.file.buffer
    );

    if (!imagePath) return res.json({ message: "Image upload failed" });

    return res.status(200).json({ image: imagePath });
  }
);

export default router;
