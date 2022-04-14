import { Request, Response } from "express";
import {
  ICreateMaterialBody,
  IUpdateMaterialBody,
} from "../../../shared/types/learning";
import Course from "../../database/models/learning/Course";
import Department from "../../database/models/learning/Department";
import Material from "../../database/models/learning/Material";

const updateOpt = { new: true, omitUndefined: true };

// Create
const createMaterial = async (req: Request, res: Response) => {
  const {
    type,
    file,
    courseCode,
    name,
    sessionYear,
    author,
  }: ICreateMaterialBody = req.body;
  const { courseId } = req.params;

  const course = await Course.findOne({ _id: courseId });
  if (!course) return res.status(404).json({ message: "Course not found" });

  const dept = await Department.findOne(
    {
      semesters: { $elemMatch: { _id: course.semesterId } },
    },
    {
      semesters: { $elemMatch: { _id: course.semesterId } },
    }
  );
  if (!dept) return res.status(500).json({ message: "Something went wrong" });

  // check for material name and abbr under course
  if (name) {
    const materialFound = await Material.findOne({ name, courseId });
    if (materialFound) {
      return res.status(400).json({
        message: `Material with same name already exists under ${course.name}`,
      });
    }
  }

  const newMaterial = new Material({
    type,
    file,
    courseCode,
    name,
    sessionYear,
    author,
    courseSlug: course.slug,
    courseId,
    semesterId: course.semesterId,
    departmentId: course.departmentId,
    universityId: course.universityId,
  });

  const semester = dept.semesters[0];
  if (!semester.hasMaterial) {
    const [material] = await Promise.all([
      newMaterial.save(),
      Department.findOneAndUpdate(
        { _id: course.departmentId, "semesters._id": semester._id },
        { $set: { "semesters.$.hasMaterial": true } },
        {}
      ),
    ]);
    return res.status(200).json(material);
  }

  const material = await newMaterial.save();
  return res.status(200).json(material);
};

// Update
const updateMaterial = async (req: Request, res: Response) => {
  const {
    type,
    file,
    courseCode,
    name,
    sessionYear,
    author,
  }: IUpdateMaterialBody = req.body;
  const { materialId } = req.params;

  const query = { _id: materialId };

  const material = await Material.findOne(query);
  if (!material) return res.status(404).json({ message: "Material not found" });

  if (name !== material.name) {
    const materialFound = await Material.findOne({
      name,
      courseId: material.courseId,
    });
    if (materialFound)
      return res.status(400).json({
        message: "Material with same name already exists under this course",
      });
  }

  const updatedMaterial = await Material.findOneAndUpdate(
    query,
    { type, file, courseCode, name, sessionYear, author },
    updateOpt
  );
  return res.status(200).json(updatedMaterial);
};

// Delete
const deleteMaterial = async (req: Request, res: Response) => {
  const { materialId } = req.params;
  const query = { _id: materialId };

  const material = await Material.findOne(query);
  if (!material) return res.status(404).json({ message: "Material not found" });

  const materials = await Material.find({ semesterId: material.semesterId });

  if (materials.length === 1) {
    await Promise.all([
      Department.findOneAndUpdate(
        { _id: material.departmentId, "semesters._id": material.semesterId },
        { $set: { "semesters.$.hasMaterial": false } },
        {}
      ),
      Material.findOneAndDelete(query),
    ]);
    return res.status(200).json({ message: "success" });
  }

  await Material.findOneAndDelete(query);
  return res.status(200).json({ message: "success" });
};

// Get All
const getAllMaterialsByCourse = async (req: Request, res: Response) => {
  const { courseId } = req.params;
  const materials = await Material.find({ courseId });
  return res.status(200).json(materials);
};

const getAllMaterialByCourseName = async (req: Request, res: Response) => {
  const { courseName } = req.params;
  const regex = new RegExp(`${courseName}$`, "i");
  const materials = await Material.find({ slug: { $regex: regex } });
  return res.status(200).json(materials);
};

const getAllMaterialByCourseSlug = async (req: Request, res: Response) => {
  const { courseSlug } = req.params;
  const materials = await Material.find({ courseSlug });
  return res.status(200).json(materials);
};

// Get Single
const getMaterial = async (req: Request, res: Response) => {
  const { materialId } = req.params;

  const material = await Material.findOne({ _id: materialId });
  if (!material) return res.status(404).json({ message: "Material not found" });

  return res.status(200).json(material);
};

export default {
  createMaterial,
  updateMaterial,
  deleteMaterial,
  getAllMaterialsByCourse,
  getAllMaterialByCourseName,
  getAllMaterialByCourseSlug,
  getMaterial,
};
